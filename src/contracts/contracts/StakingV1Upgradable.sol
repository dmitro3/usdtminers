// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

interface IERC20_EXTENDED {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint);
}

interface IReferral {
    function payStakingReferralAdmin(
        uint256 _value,
        address _referee
    ) external returns (bool);
}

contract StakingV1Upgradable is
    Initializable,
    PausableUpgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    address private tokenSeller;
    address private tokenContract;
    address private presaleContract;
    address private referralContract;

    uint256 private totalStakers;
    uint256 private totalValueStaked;
    uint256 private totalRewardsDistributed;

    uint256[] private stakingDurations;
    uint256[] private rewardRates;

    uint256 private minStakingValue;

    struct Account {
        uint256 valueStaked;
        uint256 rewardRate;
        uint256 startTime;
        uint256 endTime;
        uint256 rewardClaimed;
    }

    mapping(address => mapping(uint256 => Account)) private user;
    mapping(address => uint256[]) private userStakingIndexes;
    mapping(address => uint256[]) private userRewardClaimed;
    mapping(address => uint256[]) private userRewardClaimedTimestamp;

    event Stake(
        address indexed userAddress,
        uint256 indexed valueStaked,
        uint256 indexed duration,
        uint256 stakingID
    );
    event StakingRewardClaimed(
        address indexed userAddress,
        uint256 indexed reward,
        uint256 indexed stakingID
    );
    event Unstake(
        address indexed userAddress,
        uint256 indexed valueStaked,
        uint256 indexed stakingID
    );

    function initialize() public initializer {
        tokenSeller = 0x4345492B7bf4967e8Ff7b3D0858945560391eab1;
        tokenContract = 0xaDA2dEc22F0796F9B4A538f51b6AC868D449c143;
        presaleContract = 0x4A805032708399940A87D2a593Ca51cC38C79668;
        referralContract = 0x5dCe6e00A27F962c82cd7a11cdf5ED61fB5Df5e3;

        stakingDurations = [90 days, 180 days, 365 days, 545 days];
        rewardRates = [12, 15, 18, 21];
        minStakingValue = 1000000000000000000;

        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    receive() external payable {}

    function _getRewardRate(
        uint256 _duration
    ) private view returns (uint256 currentReward) {
        uint256 userStakingDuration = _duration;
        uint256 stakingDurationsLength = stakingDurations.length;

        for (uint8 i; i < stakingDurationsLength; i++) {
            if (userStakingDuration <= stakingDurations[i]) {
                currentReward = rewardRates[i];
                break;
            } else if (i == stakingDurationsLength - 1) {
                currentReward = rewardRates[i];
            }
        }

        return currentReward;
    }

    function _transferTokensFrom(
        address _tokenContract,
        address _ownerAddress,
        address _to,
        uint256 _tokenValue
    ) private {
        IERC20Upgradeable(_tokenContract).transferFrom(
            _ownerAddress,
            _to,
            _tokenValue
        );
    }

    function _stake(
        address _address,
        uint256 _value,
        uint256 _duration
    ) private returns (bool) {
        require(
            _duration <= _maxStakingDuration() &&
                _duration >= _minStakingDuration(),
            "Staking duration must be >= minStakingDuration and <= maxStakingDuration."
        );
        require(
            _value >= minStakingValue,
            "Staking value should be >= minStakingValue."
        );
        uint256 stakingID = totalStakers + 1;
        Account storage userAccount = user[_address][stakingID];

        userAccount.valueStaked = _value;
        userAccount.rewardRate = _getRewardRate(_duration);
        userAccount.startTime = _getCurrentTime();
        userAccount.endTime = _getCurrentTime() + _duration;
        userStakingIndexes[_address].push(stakingID);

        totalStakers++;
        totalValueStaked += _value;

        emit Stake(_address, _value, _duration, stakingID);

        return true;
    }

    function stake(
        uint256 _value,
        uint256 _duration
    ) external whenNotPaused returns (bool) {
        IERC20Upgradeable(tokenContract).transferFrom(
            msg.sender,
            address(this),
            _value
        );
        return _stake(msg.sender, _value, _duration);
    }

    function stakeByAdmin(
        address _userAddress,
        uint256 _value,
        uint256 _duration
    ) external returns (bool) {
        address _msgSender = msg.sender;
        require(
            _msgSender == owner() ||
                _msgSender == presaleContract ||
                _msgSender == referralContract,
            "Only owner can call this function."
        );
        return _stake(_userAddress, _value, _duration);
    }

    function _getStakingReward(
        address _address,
        uint256 _stakingID
    ) private view returns (uint256 stakingReward) {
        Account storage userAccount = user[_address][_stakingID];
        uint256 valueStaked = userAccount.valueStaked;
        uint256 startTime = userAccount.startTime;
        uint256 endTime = userAccount.endTime;

        uint256 baseReward = ((valueStaked * userAccount.rewardRate) / 100) /
            30 days;
        uint256 stakingTimePassed = _getCurrentTime() - startTime;
        stakingReward =
            (baseReward *
                _min(_min(endTime, stakingTimePassed), _maxStakingDuration())) -
            userAccount.rewardClaimed;

        return stakingReward;
    }

    function getStakingReward(
        address _userAddress,
        uint256 _stakingID
    ) external view returns (uint256) {
        return _getStakingReward(_userAddress, _stakingID);
    }

    function getStakingRewardAll(
        address _userAddress
    ) external view returns (uint256 totalStakingReward) {
        uint256[] memory stakingIDs = userStakingIndexes[_userAddress];
        uint256 stakingIDLength = userStakingIndexes[_userAddress].length;

        for (uint8 i; i < stakingIDLength; i++) {
            totalStakingReward += _getStakingReward(
                _userAddress,
                stakingIDs[i]
            );
        }
    }

    function _claimReward(
        address _address,
        uint256 _stakingID
    ) private returns (uint256) {
        Account storage userAccount = user[_address][_stakingID];
        require(userAccount.valueStaked > 0, "You have no staking yet.");
        uint256 stakingReward = _getStakingReward(_address, _stakingID);
        userAccount.rewardClaimed += stakingReward;
        userRewardClaimed[_address].push(stakingReward);
        userRewardClaimedTimestamp[_address].push(_getCurrentTime());
        totalRewardsDistributed += stakingReward;
        emit StakingRewardClaimed(_address, stakingReward, _stakingID);
        IReferral(referralContract).payStakingReferralAdmin(
            stakingReward,
            _address
        );

        return stakingReward;
    }

    function claimStakingReward(uint256 _stakingID) external returns (bool) {
        uint256 stakingReward = _claimReward(msg.sender, _stakingID);
        _transferTokensFrom(
            tokenContract,
            tokenSeller,
            msg.sender,
            stakingReward
        );
        return true;
    }

    function _unStake(
        address _address,
        uint256 _stakingID
    ) private returns (uint256) {
        Account storage userAccount = user[_address][_stakingID];
        uint256 valueStaked = userAccount.valueStaked;
        require(
            valueStaked > 0 && _getCurrentTime() >= userAccount.endTime,
            "Your staking is not over or you have no staking yet."
        );

        delete userAccount.valueStaked;
        delete userAccount.rewardRate;
        delete userAccount.startTime;
        delete userAccount.endTime;

        totalValueStaked -= valueStaked;
        totalStakers--;

        emit Unstake(_address, valueStaked, _stakingID);
        return valueStaked;
    }

    function unStake(uint256 _stakingID) external returns (bool) {
        uint256 stakingReward = _claimReward(msg.sender, _stakingID);
        uint256 unStakeValue = _unStake(msg.sender, _stakingID);
        _transferTokensFrom(
            tokenContract,
            tokenSeller,
            msg.sender,
            stakingReward + unStakeValue
        );
        return true;
    }

    function unStakeByAdmin(
        address _userAddress,
        uint256 _stakingID
    ) external onlyOwner returns (bool) {
        _claimReward(_userAddress, _stakingID);
        _unStake(_userAddress, _stakingID);
        return true;
    }

    function isStaked(address _userAddress) external view returns (bool) {
        uint256[] memory stakingIndexes = userStakingIndexes[_userAddress];
        uint256 stakingIndexsLength = stakingIndexes.length;

        for (uint256 i; i < stakingIndexsLength; i++) {
            if (user[_userAddress][stakingIndexes[i]].valueStaked > 0) {
                return true;
            }
        }

        return false;
    }

    function getUserTotalStakedValue(
        address _userAddress
    ) external view returns (uint256 userTotalValueStaked) {
        uint256[] memory stakingIndexes = userStakingIndexes[_userAddress];
        uint256 stakingIndexesLength = stakingIndexes.length;

        for (uint256 i; i < stakingIndexesLength; i++) {
            userTotalValueStaked += user[_userAddress][stakingIndexes[i]]
                .valueStaked;
        }
    }

    function getUserStakingByID(
        address _address,
        uint256 _stakingID
    )
        external
        view
        returns (
            uint256 valueStaked,
            uint256 startTime,
            uint256 endTime,
            uint256 stakingDuration,
            uint256 timeLeft
        )
    {
        Account storage userAccount = user[_address][_stakingID];
        valueStaked = userAccount.valueStaked;
        startTime = userAccount.startTime;
        endTime = userAccount.endTime;
        stakingDuration = endTime - startTime;
        if (_getCurrentTime() >= endTime) {
            timeLeft = 0;
        } else {
            timeLeft = endTime - _getCurrentTime();
        }
    }

    function getUserStakingRewardRate(
        address _userAddress,
        uint256 _stakingID
    ) external view returns (uint256) {
        Account storage userAccount = user[_userAddress][_stakingID];
        return userAccount.rewardRate;
    }

    function getUserStakingAPY(
        address _userAddress,
        uint256 _stakingID
    ) external view returns (uint256 userStakingAPY) {
        Account storage userAccount = user[_userAddress][_stakingID];
        uint256 userCurrentRewardRate = userAccount.rewardRate;
        userStakingAPY = userCurrentRewardRate * 12;
        return userStakingAPY;
    }

    function getUserTotalStakingsCount(
        address _userAddress
    ) external view returns (uint256) {
        return userStakingIndexes[_userAddress].length;
    }

    function getUserStakingIDs(
        address _userAddress
    ) public view returns (uint256[] memory) {
        return userStakingIndexes[_userAddress];
    }

    function getUserRewardClaimedByStakingID(
        address _userAddress,
        uint256 _stakingID
    ) external view returns (uint256) {
        Account storage userAccount = user[_userAddress][_stakingID];
        return userAccount.rewardClaimed;
    }

    function getUserTotalRewardClaimed(
        address _userAddress
    )
        external
        view
        returns (
            uint256 totalRewardClaimed,
            uint256[] memory rewardClaimedArray,
            uint256[] memory rewardClaimedTimestamp
        )
    {
        rewardClaimedArray = userRewardClaimed[_userAddress];
        uint256 rewardClaimedlength = rewardClaimedArray.length;

        for (uint256 i; i < rewardClaimedlength; i++) {
            totalRewardClaimed += rewardClaimedArray[i];
        }
        rewardClaimedTimestamp = userRewardClaimedTimestamp[_userAddress];
    }

    function getTokenContract()
        external
        view
        returns (
            address tokenAddress,
            string memory tokenName,
            uint256 tokenDecimals,
            uint256 tokenSupply
        )
    {
        tokenAddress = tokenContract;
        tokenName = IERC20_EXTENDED(tokenContract).name();
        tokenDecimals = IERC20_EXTENDED(tokenContract).decimals();
        tokenSupply = IERC20Upgradeable(tokenContract).totalSupply();
    }

    function updateTokenContract(
        address _tokenAddress
    ) external onlyOwner returns (address) {
        tokenContract = _tokenAddress;
        return tokenContract;
    }

    function getPresaleContract() external view returns (address) {
        return presaleContract;
    }

    function updatePresaleContract(
        address _presaleAddress
    ) external onlyOwner returns (address) {
        presaleContract = _presaleAddress;
        return presaleContract;
    }

    function getReferralContract() external view returns (address) {
        return referralContract;
    }

    function updateReferralContract(
        address _referralAddress
    ) external onlyOwner returns (address) {
        referralContract = _referralAddress;
        return referralContract;
    }

    function getStakingAnalystics()
        external
        view
        returns (
            uint256[] memory stakingRewardRates,
            uint256[] memory stakingRewardDurations,
            uint256 stakers,
            uint256 tokenStaked,
            uint256 rewardDistributed
        )
    {
        stakingRewardRates = rewardRates;
        stakingRewardDurations = stakingDurations;
        stakers = totalStakers;
        tokenStaked = totalValueStaked;
        rewardDistributed = totalRewardsDistributed;
    }

    function setStakingDurationAndRateAdmin(
        uint256[] calldata _rewardRates,
        uint256[] calldata _stakingDurations
    ) external onlyOwner returns (bool) {
        rewardRates = _rewardRates;
        stakingDurations = _stakingDurations;
        return true;
    }

    function _minStakingDuration() private view returns (uint256) {
        return stakingDurations[0];
    }

    function _maxStakingDuration() private view returns (uint256) {
        uint256 length = stakingDurations.length;
        return stakingDurations[length - 1];
    }

    function getStakingCapping()
        external
        view
        returns (
            uint256 minTokensToStake,
            uint256 minDurationToStake,
            uint256 maxDurationToStake
        )
    {
        minTokensToStake = minStakingValue;
        minDurationToStake = _minStakingDuration();
        maxDurationToStake = _maxStakingDuration();
    }

    function setMinStakingValue(
        uint256 _value
    ) external onlyOwner returns (uint256) {
        minStakingValue = _value;
        return minStakingValue;
    }

    /*Admin function*/

    function withdrawTokens(
        address _tokenAddress,
        address _receiver,
        uint256 _value
    ) external onlyOwner returns (bool) {
        IERC20Upgradeable(_tokenAddress).transfer(_receiver, _value);
        return true;
    }

    function withdrawNativeFunds(
        address _receiver,
        uint256 _value
    ) external onlyOwner returns (bool) {
        payable(_receiver).transfer(_value);
        return true;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    function _getCurrentTime() private view returns (uint256 currentTime) {
        currentTime = block.timestamp;
        return currentTime;
    }

    function _min(uint256 a, uint256 b) private pure returns (uint256) {
        return a < b ? a : b;
    }
}
