// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

interface IERC20_EXTENDED {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint);
}

contract ReferralV1Upgradable is
    Initializable,
    PausableUpgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    using SafeMathUpgradeable for uint256;

    address private tokenContract;
    address private USDContract;
    address private presaleContract;
    address private stakingContract;

    address private tokenSeller;

    uint256[] private levelRateReferral;
    uint256[] private levelRateStaking;
    uint256 private levelDecimals;
    uint256 private circularReferenceLevels;

    uint256 private totalReferralPaidETH;
    uint256 private totalReferralPaidUSD;
    uint256 private totalReferralPaidStaking;

    address payable private defaultReferrer;

    struct Account {
        address referrer;
        address[] referredAddresses;
        address[] teamAddress;
        uint256 totalBusinessETH;
        uint256 totalBusinessUSD;
        uint256[] rewardPaidETH;
        uint256[] rewardPaidUSD;
        uint256[] rewardPaidStaking;
        uint256[] rewardPaidTimeETH;
        uint256[] rewardPaidTimeUSD;
        uint256[] rewardPaidTimeStaking;
    }

    mapping(address => Account) private accounts;

    address private rewardTokenContract;
    address private rewardTokenOwner;
    bool private isPayRewardToken;

    event RegisteredReferer(address indexed referrer, address indexed referee);

    event RegisteredTeamAddress(
        address indexed parent,
        address indexed referrer,
        address indexed referee
    );

    event RegisterRefererFailed(
        address indexed referee,
        address indexed referrer,
        string indexed reason
    );

    event ReferralRewardPaid(
        address indexed referee,
        address indexed referrer,
        uint256 indexed amount,
        uint256 level,
        string currency
    );

    event RewardTokenDistributed(
        address indexed to,
        uint256 indexed tokenValue,
        address indexed rewardTokenContract
    );

    function initialize() public initializer {
        tokenSeller = 0x4345492B7bf4967e8Ff7b3D0858945560391eab1;
        tokenContract = 0xaDA2dEc22F0796F9B4A538f51b6AC868D449c143;
        rewardTokenContract = 0xaDA2dEc22F0796F9B4A538f51b6AC868D449c143;
        USDContract = 0xbfA0e2F4b2676c62885B1033670C71cdefd975fB;
        presaleContract = 0x90DE6255F7D4E0B23b19eCa6a2CA93a81328C916;
        stakingContract;

        rewardTokenOwner = 0x4345492B7bf4967e8Ff7b3D0858945560391eab1;
        isPayRewardToken = true;

        defaultReferrer = payable(0x4345492B7bf4967e8Ff7b3D0858945560391eab1);
        levelDecimals = 100;
        levelRateReferral = [10];
        levelRateStaking = [10, 5, 3, 2, 1];
        circularReferenceLevels = 5;

        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    receive() external payable {}

    function getUserAccount(
        address _address
    ) external view returns (Account memory userAccount) {
        userAccount = accounts[_address];
    }

    function getLevelDecimals() external view returns (uint256) {
        return levelDecimals;
    }

    function setLevelDecimals(
        uint256 _value
    ) external onlyOwner returns (bool) {
        levelDecimals = _value;
        return true;
    }

    function getLevelRates()
        external
        view
        returns (
            uint256[] memory presale,
            uint256 totalRatePresale,
            uint256[] memory staking,
            uint256 totalRateStaking
        )
    {
        presale = levelRateReferral;
        uint256 presaleRateLength = presale.length;
        for (uint8 i; i < presaleRateLength; i++) {
            totalRatePresale += presale[i];
        }
        staking = levelRateStaking;
        uint256 stakingRateLength = staking.length;
        for (uint8 i; i < stakingRateLength; i++) {
            totalRateStaking += staking[i];
        }
    }

    function setLevelRateReferral(
        uint256[] calldata _value
    ) external onlyOwner returns (bool) {
        levelRateReferral = _value;
        return true;
    }

    function setLevelRateStaking(
        uint256[] calldata _value
    ) external onlyOwner returns (bool) {
        levelRateStaking = _value;
        return true;
    }

    function getCircularReferenceLevels() external view returns (uint256) {
        return circularReferenceLevels;
    }

    function setCircularReferenceLevels(
        uint256 _value
    ) external onlyOwner returns (uint256) {
        return circularReferenceLevels = _value;
    }

    function getTokenSeller() external view returns (address) {
        return tokenSeller;
    }

    function setTokenSeller(address _address) external onlyOwner {
        tokenSeller = _address;
    }

    function getRewardTokenOwner() external view returns (address) {
        return rewardTokenOwner;
    }

    function setRewardTokenOwner(address _address) external onlyOwner {
        rewardTokenOwner = _address;
    }

    function getDefaultReferrer() public view returns (address) {
        return defaultReferrer;
    }

    function setDefaultReferrer(address payable _address) public onlyOwner {
        defaultReferrer = _address;
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

    function setTokenContractAdmin(
        address _address
    ) external onlyOwner returns (bool) {
        tokenContract = _address;
        return true;
    }

    function getRewardTokenContract()
        external
        view
        returns (
            address tokenAddress,
            string memory tokenName,
            uint256 tokenDecimals,
            uint256 tokenSupply
        )
    {
        tokenAddress = rewardTokenContract;
        tokenName = IERC20_EXTENDED(rewardTokenContract).name();
        tokenDecimals = IERC20_EXTENDED(rewardTokenContract).decimals();
        tokenSupply = IERC20Upgradeable(rewardTokenContract).totalSupply();
    }

    function setRewardTokenContract(
        address _tokenContractAddress
    ) external onlyOwner {
        rewardTokenContract = _tokenContractAddress;
    }

    function getUSDContract()
        external
        view
        returns (
            address USDAddress,
            string memory USDName,
            uint256 USDDecimals,
            uint256 USDSupply
        )
    {
        USDAddress = USDContract;
        USDName = IERC20_EXTENDED(USDContract).name();
        USDDecimals = IERC20_EXTENDED(USDContract).decimals();
        USDSupply = IERC20Upgradeable(USDContract).totalSupply();
    }

    function setUSDContractAdmin(
        address _address
    ) external onlyOwner returns (bool) {
        USDContract = _address;
        return true;
    }

    function getPresaleContract() external view returns (address) {
        return presaleContract;
    }

    function setPresaleContract(
        address _address
    ) external onlyOwner returns (address) {
        return presaleContract = _address;
    }

    function getStakingContract() external view returns (address) {
        return stakingContract;
    }

    function setStakingContract(
        address _address
    ) external onlyOwner returns (address) {
        return stakingContract = _address;
    }

    function getUserReferrerAddress(
        address _address
    ) external view returns (address referrer) {
        Account storage userAccount = accounts[_address];
        referrer = userAccount.referrer;
    }

    function getUserReferee(
        address _address
    )
        external
        view
        returns (address[] memory userRefereeAddress, uint256 userRefereeCount)
    {
        Account storage userAccount = accounts[_address];
        userRefereeAddress = userAccount.referredAddresses;
        userRefereeCount = userRefereeAddress.length;
    }

    function getUserTeamReferee(
        address _address
    )
        external
        view
        returns (
            address[] memory userTeamReferees,
            uint256 userTeamRefereeCount
        )
    {
        Account storage userAccount = accounts[_address];
        userTeamReferees = userAccount.teamAddress;
        userTeamRefereeCount = userTeamReferees.length;
    }

    function getUserRewardPaid(
        address _address
    )
        external
        view
        returns (
            uint256[] memory rewardPaidETH,
            uint256[] memory rewardPaidUSD,
            uint256[] memory rewardPaidStaking
        )
    {
        Account storage userAccount = accounts[_address];
        rewardPaidETH = userAccount.rewardPaidETH;
        rewardPaidUSD = userAccount.rewardPaidUSD;
        rewardPaidStaking = userAccount.rewardPaidStaking;
    }

    function getUserRewardPaidTimestamp(
        address _address
    )
        external
        view
        returns (
            uint256[] memory rewardPaidTimeETH,
            uint256[] memory rewardPaidTimeUSD,
            uint256[] memory rewardPaidTimeStaking
        )
    {
        Account storage userAccount = accounts[_address];
        rewardPaidTimeETH = userAccount.rewardPaidTimeETH;
        rewardPaidTimeUSD = userAccount.rewardPaidTimeUSD;
        rewardPaidTimeStaking = userAccount.rewardPaidTimeStaking;
    }

    function getUserTotalRewardPaid(
        address _address
    )
        external
        view
        returns (
            uint256 rewardPaidETH,
            uint256 rewardPaidUSD,
            uint256 rewardPaidStaking
        )
    {
        Account storage userAccount = accounts[_address];
        uint256 ethLength = userAccount.rewardPaidETH.length;
        uint256 USDLength = userAccount.rewardPaidUSD.length;
        uint256 stakingLength = userAccount.rewardPaidStaking.length;

        for (uint256 i; i < ethLength; i++) {
            rewardPaidETH += userAccount.rewardPaidETH[i];
        }

        for (uint256 i; i < USDLength; i++) {
            rewardPaidUSD += userAccount.rewardPaidUSD[i];
        }

        for (uint256 i; i < stakingLength; i++) {
            rewardPaidStaking += userAccount.rewardPaidStaking[i];
        }
    }

    function getUserTotalBusiness(
        address _address
    ) external view returns (uint256 businessETH, uint256 businessUSD) {
        Account storage userAccount = accounts[_address];
        businessETH = userAccount.totalBusinessETH;
        businessUSD = userAccount.totalBusinessUSD;
    }

    function _hasReferrer(address _address) private view returns (bool) {
        return accounts[_address].referrer != address(0);
    }

    function _isCircularReference(
        address referrer,
        address referee
    ) private view returns (bool) {
        require(referrer != address(0), "Address cannot be 0x0.");
        address parent = referrer;

        for (uint256 i; i < circularReferenceLevels; i++) {
            if (parent == referee) {
                return true;
            }

            parent = accounts[parent].referrer;
        }

        return false;
    }

    function _addReferrer(
        address _address,
        address _referrer
    ) private returns (bool) {
        if (_isCircularReference(_referrer, _address)) {
            emit RegisterRefererFailed(
                _address,
                _referrer,
                "Referee cannot be one of referrer uplines."
            );
            return false;
        } else if (accounts[_address].referrer != address(0)) {
            emit RegisterRefererFailed(
                _address,
                _referrer,
                "Address already have referrer."
            );
            return false;
        }

        Account storage userAccount = accounts[_address];
        Account storage referrerAccount = accounts[_referrer];
        userAccount.referrer = payable(_referrer);
        referrerAccount.referredAddresses.push(_address);
        emit RegisteredReferer(_referrer, _address);

        for (uint256 i; i < levelRateStaking.length; i++) {
            Account storage referrerParentAddress = accounts[
                referrerAccount.referrer
            ];

            if (referrerAccount.referrer == address(0)) {
                break;
            }

            referrerParentAddress.teamAddress.push(_address);

            referrerAccount = referrerParentAddress;
            emit RegisteredTeamAddress(
                referrerAccount.referrer,
                _referrer,
                _address
            );
        }
        return true;
    }

    function addReferrerAdmin(
        address _userAddress,
        address _referrerAddress
    ) external returns (bool) {
        require(
            msg.sender == owner() ||
                msg.sender == presaleContract ||
                msg.sender == stakingContract,
            "Only owner can call this function."
        );

        return _addReferrer(_userAddress, _referrerAddress);
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

    function _payReferralInETH(
        uint256 _value,
        address _userAddress,
        address _referrerAddress
    ) private {
        if (!_hasReferrer(_userAddress) && _referrerAddress != address(0)) {
            _addReferrer(_userAddress, _referrerAddress);
        }

        if (!_hasReferrer(_referrerAddress) && _referrerAddress != address(0)) {
            _addReferrer(_referrerAddress, defaultReferrer);
        }
        Account memory userAccount = accounts[_userAddress];
        uint256 totalReferral;

        for (uint256 i; i < levelRateReferral.length; i++) {
            address referrer = userAccount.referrer;

            Account storage referrerAccount = accounts[userAccount.referrer];

            if (referrer == address(0)) {
                break;
            }

            uint256 c = _value.mul(levelRateReferral[i]).div(levelDecimals);
            referrerAccount.totalBusinessETH += _value;
            referrerAccount.rewardPaidETH.push(c);
            totalReferral += c;
            payable(referrer).transfer(c);
            if (isPayRewardToken) {
                _transferTokensFrom(
                    rewardTokenContract,
                    rewardTokenOwner,
                    referrer,
                    c
                );
                emit RewardTokenDistributed(referrer, c, rewardTokenContract);
            }

            emit ReferralRewardPaid(_userAddress, referrer, c, i + 1, "ETH");

            userAccount = referrerAccount;
        }

        totalReferralPaidETH += totalReferral;
    }

    function payReferralETHAdmin(
        uint256 _value,
        address _userAddress,
        address _referrerAddress
    ) external returns (bool) {
        address _msgSender = msg.sender;
        require(
            _msgSender == owner() || _msgSender == presaleContract,
            "Only owner can call this function."
        );
        _payReferralInETH(_value, _userAddress, _referrerAddress);
        return true;
    }

    function _payReferralInUSD(
        uint256 _value,
        address _userAddress,
        address _referrerAddress
    ) private {
        if (!_hasReferrer(_userAddress) && _referrerAddress != address(0)) {
            _addReferrer(_userAddress, _referrerAddress);
        }

        if (!_hasReferrer(_referrerAddress) && _referrerAddress != address(0)) {
            _addReferrer(_referrerAddress, defaultReferrer);
        }
        Account memory userAccount = accounts[_userAddress];
        uint256 totalReferral;

        for (uint256 i; i < levelRateReferral.length; i++) {
            address referrer = userAccount.referrer;
            Account storage referrerAccount = accounts[userAccount.referrer];

            if (referrer == address(0)) {
                break;
            }

            uint256 c = _value.mul(levelRateReferral[i]).div(levelDecimals);

            referrerAccount.totalBusinessUSD += _value;
            referrerAccount.rewardPaidUSD.push(c);
            totalReferral += c;

            _transferTokensFrom(USDContract, tokenSeller, referrer, c);
            if (isPayRewardToken) {
                _transferTokensFrom(
                    rewardTokenContract,
                    rewardTokenOwner,
                    referrer,
                    c
                );
                emit RewardTokenDistributed(referrer, c, rewardTokenContract);
            }

            emit ReferralRewardPaid(_userAddress, referrer, c, i + 1, "USDT");
            userAccount = referrerAccount;
        }

        totalReferralPaidUSD += totalReferral;
    }

    function payReferralUSDAdmin(
        uint256 _value,
        address _userAddress,
        address _referralAddress
    ) external returns (bool) {
        address _msgSender = msg.sender;
        require(
            _msgSender == owner() || _msgSender == presaleContract,
            "Only owner can call this function."
        );
        _payReferralInUSD(_value, _userAddress, _referralAddress);
        return true;
    }

    function _payReferralStaking(uint256 value, address _referee) private {
        Account memory userAccount = accounts[_referee];
        uint256 totalReferral;

        for (uint256 i; i < levelRateStaking.length; i++) {
            address referrer = userAccount.referrer;
            Account storage referrerAccount = accounts[userAccount.referrer];

            if (referrer == address(0)) {
                break;
            }

            uint256 c = value.mul(levelRateStaking[i]).div(levelDecimals);

            referrerAccount.rewardPaidStaking.push(c);
            totalReferral += c;

            _transferTokensFrom(tokenContract, tokenSeller, referrer, c);

            emit ReferralRewardPaid(_referee, referrer, c, i + 1, "Staking");
            userAccount = referrerAccount;
        }

        totalReferralPaidStaking += totalReferral;
    }

    function payStakingReferralAdmin(
        uint256 _value,
        address _referee
    ) external returns (bool) {
        address _msgSender = msg.sender;
        require(
            _msgSender == owner() || _msgSender == stakingContract,
            "Only owner can call this function."
        );
        _payReferralStaking(_value, _referee);
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

    function sendNativeFundsAdmin(
        address _address,
        uint256 _value
    ) external onlyOwner {
        payable(_address).transfer(_value);
    }

    function withdrawAdmin() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function withdrawTokenAdmin(
        address _tokenAddress,
        uint256 _value
    ) external onlyOwner {
        IERC20Upgradeable(_tokenAddress).transfer(msg.sender, _value);
    }
}
