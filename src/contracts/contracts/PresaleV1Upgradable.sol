//SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

interface IERC20_EXTENDED {
    function name() external view returns (string memory);

    function decimals() external view returns (uint256);
}

interface IStaking {
    function stakeByAdmin(
        address _userAddress,
        uint256 _value,
        uint256 _duration
    ) external returns (bool);
}

interface IReferral {
    function payReferralETHAdmin(
        uint256 _value,
        address _userAddress,
        address _referrerAddress
    ) external returns (bool);

    function payReferralUSDAdmin(
        uint256 _value,
        address _userAddress,
        address _referrerAddress
    ) external returns (bool);

    function getLevelRates()
        external
        view
        returns (
            uint256[] memory presale,
            uint256 totalRatePresale,
            uint256[] memory staking,
            uint256 totalRateStaking
        );

    function getUserReferrerAddress(
        address _address
    ) external view returns (address referrer);
}

contract PresaleV1Upgradable is
    Initializable,
    OwnableUpgradeable,
    PausableUpgradeable,
    UUPSUpgradeable
{
    using SafeMathUpgradeable for uint256;

    address private tokenSeller;
    address private rewardOwner;

    address private tokenContract;
    address private stakingContract;
    address private referralContract;
    address private USDContract;
    address private rewardTokenContract;

    AggregatorV3Interface private priceFeedOracleAddress;

    uint256 private pricePerUSD;
    uint256 private rewardPerUSD;
    uint256 private minContributionUSD;

    uint256 private totalTokenSold;
    uint256 private totalETHRaised;
    uint256 private totalUSDRaised;

    bool private isBuyNStake;
    bool private isPayReferral;
    bool private isPayRewardTokens;

    receive() external payable {}

    event TokenPurchased(
        address indexed from,
        uint256 indexed tokenValue,
        uint256 indexed ethValue,
        string currency
    );

    event RewardTokenDistributed(
        address indexed to,
        uint256 indexed tokenValue,
        address indexed rewardTokenContract
    );

    function initialize() external initializer {
        priceFeedOracleAddress = AggregatorV3Interface(
            0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526
        );

        USDContract = 0xbfA0e2F4b2676c62885B1033670C71cdefd975fB;
        tokenContract = 0xaDA2dEc22F0796F9B4A538f51b6AC868D449c143;
        rewardTokenContract = 0xaDA2dEc22F0796F9B4A538f51b6AC868D449c143;
        referralContract;
        stakingContract;

        tokenSeller = 0x4345492B7bf4967e8Ff7b3D0858945560391eab1;
        rewardOwner = 0x4345492B7bf4967e8Ff7b3D0858945560391eab1;

        pricePerUSD = 85000000000000000000;
        rewardPerUSD = 8500000000000000000;

        isPayReferral = true;
        isBuyNStake = true;
        isPayRewardTokens = true;

        minContributionUSD = 0;

        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    function getPriceFeedOracleAddress() external view returns (address) {
        return address(priceFeedOracleAddress);
    }

    function setpriceFeedOracleAddressAdmin(
        address _address
    ) external onlyOwner returns (bool) {
        priceFeedOracleAddress = AggregatorV3Interface(_address);
        return true;
    }

    function getTokenSeller() external view returns (address) {
        return tokenSeller;
    }

    function setTokenSeller(address _address) external onlyOwner {
        tokenSeller = _address;
    }

    function getRewardOwners() external view returns (address) {
        return rewardOwner;
    }

    function setRewardOwner(address _address) external onlyOwner {
        rewardOwner = _address;
    }

    function getTokenContract()
        external
        view
        returns (
            address tokenAddress,
            string memory name,
            uint256 decimals,
            uint256 totalSupply
        )
    {
        tokenAddress = tokenContract;
        name = IERC20_EXTENDED(tokenContract).name();
        decimals = IERC20_EXTENDED(tokenContract).decimals();
        totalSupply = IERC20Upgradeable(tokenContract).totalSupply();
    }

    function setTokenContractAdmin(
        address _address
    ) external onlyOwner returns (bool) {
        tokenContract = _address;
        return true;
    }

    function getStakingContract() external view returns (address) {
        return stakingContract;
    }

    function setStakingContract(
        address _address
    ) external onlyOwner returns (bool) {
        stakingContract = _address;
        return true;
    }

    function getRewardTokenContract()
        external
        view
        returns (
            address tokenAddress,
            string memory name,
            uint256 decimals,
            uint256 totalSupply
        )
    {
        tokenAddress = rewardTokenContract;
        name = IERC20_EXTENDED(rewardTokenContract).name();
        decimals = IERC20_EXTENDED(rewardTokenContract).decimals();
        totalSupply = IERC20Upgradeable(rewardTokenContract).totalSupply();
    }

    function setRewardTokenContract(
        address _tokenContractAddress
    ) external onlyOwner {
        rewardTokenContract = _tokenContractAddress;
    }

    function getReferralContract() external view returns (address) {
        return referralContract;
    }

    function setReferralContract(
        address _address
    ) external onlyOwner returns (address) {
        return referralContract = _address;
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

    function getPricePerUSD() external view returns (uint256) {
        return pricePerUSD;
    }

    function getRewardPerUSD() external view returns (uint256) {
        return rewardPerUSD;
    }

    function setPricePerUSDAdmin(
        uint256 _value
    ) external onlyOwner returns (bool) {
        pricePerUSD = _value;
        return true;
    }

    function setRewardPerUSDAdmin(
        uint256 _value
    ) external onlyOwner returns (bool) {
        rewardPerUSD = _value;
        return true;
    }

    function getPresaleAnalystics()
        external
        view
        returns (uint256 tokenSold, uint256 ethRaised, uint256 USDRaised)
    {
        tokenSold = totalTokenSold;
        ethRaised = totalETHRaised;
        USDRaised = totalUSDRaised;
    }

    function _getETH_USDPrice() private view returns (uint256 ETH_USD) {
        (, int ethPrice, , , ) = AggregatorV3Interface(priceFeedOracleAddress)
            .latestRoundData();
        ETH_USD = uint256(ethPrice) * (10 ** 10);
    }

    function getETH_USDPrice() external view returns (uint256 ETH_USD) {
        (, int ethPrice, , , ) = AggregatorV3Interface(priceFeedOracleAddress)
            .latestRoundData();
        ETH_USD = uint256(ethPrice) * (10 ** 10);
    }

    function _getMinContributionETH()
        private
        view
        returns (uint256 minETHRequired)
    {
        if (minContributionUSD == 0) {
            minETHRequired = 0;
        } else {
            uint256 ethPrice = _getETH_USDPrice();
            uint256 ratio = ethPrice / minContributionUSD;
            minETHRequired =
                (1 * 10 ** IERC20_EXTENDED(tokenContract).decimals()) /
                ratio;
        }
    }

    function minContribution()
        external
        view
        returns (uint256 minContETH, uint256 minContUSD)
    {
        minContETH = _getMinContributionETH();
        minContUSD = minContributionUSD;
    }

    function setMinContributionUSDAdmin(
        uint256 _value
    ) external onlyOwner returns (bool) {
        minContributionUSD = _value;
        return true;
    }

    function isEnabled()
        external
        view
        returns (bool stake, bool referral, bool reward)
    {
        stake = isBuyNStake;
        referral = isPayReferral;
        reward = isPayRewardTokens;
    }

    function setPayReferralAdmin(bool _bool) external onlyOwner returns (bool) {
        isPayReferral = _bool;
        return true;
    }

    function setBuyAndStake(bool _bool) external onlyOwner returns (bool) {
        return isBuyNStake = _bool;
    }

    function setPayRewardTokensAdmin(bool _bool) external onlyOwner {
        isPayRewardTokens = _bool;
    }

    function _stake(
        address _address,
        uint256 _tokenValue,
        uint256 _duration
    ) private returns (bool) {
        return
            IStaking(stakingContract).stakeByAdmin(
                _address,
                _tokenValue,
                _duration
            );
    }

    function _updateTokenSale(
        address _address,
        uint256 _tokenValue,
        uint256 _msgValue,
        string memory currency
    ) private {
        totalTokenSold += _tokenValue;
        totalETHRaised += _msgValue;
        emit TokenPurchased(_address, _tokenValue, _msgValue, currency);
    }

    function _getTokensValueETH(
        uint256 _ethValue,
        uint256 _price
    ) private view returns (uint256 tokenValue) {
        uint256 ethPrice = _getETH_USDPrice();
        uint256 ethValue = (_ethValue * ethPrice) /
            (10 ** IERC20_EXTENDED(tokenContract).decimals());
        tokenValue = ethValue * _price;
        tokenValue =
            tokenValue /
            (10 ** IERC20_EXTENDED(tokenContract).decimals());
    }

    function _getTokensValueUSD(
        uint256 _USDValue,
        uint256 _price
    ) private view returns (uint256 tokenValue) {
        tokenValue =
            (_USDValue * _price) /
            10 ** IERC20_EXTENDED(USDContract).decimals();
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

    function _getTotalReferralLevelRate() private view returns (uint256) {
        (, uint256 totalRatePresale, , ) = IReferral(referralContract)
            .getLevelRates();

        return totalRatePresale;
    }

    function BuyWithETH(
        address _referrer,
        uint256 _duration
    ) public payable whenNotPaused {
        address _msgSender = msg.sender;
        uint256 _msgValue = msg.value;

        require(
            _msgValue >= _getMinContributionETH(),
            "Eth Value is less than minContributionETH."
        );

        uint256 _tokenValue = _getTokensValueETH(_msgValue, pricePerUSD);
        uint256 _rewardValue = _getTokensValueETH(_msgValue, rewardPerUSD);

        if (isBuyNStake) {
            _stake(_msgSender, _tokenValue, _duration);
        } else {
            _transferTokensFrom(
                tokenContract,
                tokenSeller,
                _msgSender,
                _tokenValue
            );
        }

        if (isPayReferral) {
            payable(referralContract).transfer(
                _msgValue.div(_getTotalReferralLevelRate())
            );

            IReferral(referralContract).payReferralETHAdmin(
                _msgValue,
                _msgSender,
                _referrer
            );
        }

        if (isPayRewardTokens) {
            _transferTokensFrom(
                rewardTokenContract,
                rewardOwner,
                IReferral(referralContract).getUserReferrerAddress(_msgSender),
                _rewardValue
            );
            emit RewardTokenDistributed(
                IReferral(referralContract).getUserReferrerAddress(_msgSender),
                _rewardValue,
                rewardTokenContract
            );
        }

        payable(tokenSeller).transfer(address(this).balance);

        _updateTokenSale(_msgSender, _tokenValue, _msgValue, "ETH");
    }

    function BuyWithUSD(
        address _referrer,
        uint256 _value,
        uint256 _duration
    ) external whenNotPaused {
        require(
            _value >= minContributionUSD,
            "USD value less then min buy value."
        );
        address _msgSender = msg.sender;
        uint256 _tokenValue = _getTokensValueUSD(_value, pricePerUSD);
        uint256 _rewardValue = _getTokensValueUSD(_value, rewardPerUSD);

        _transferTokensFrom(USDContract, _msgSender, tokenSeller, _value);

        if (isBuyNStake) {
            _stake(_msgSender, _tokenValue, _duration);
        } else {
            _transferTokensFrom(
                tokenContract,
                tokenSeller,
                _msgSender,
                _tokenValue
            );
        }

        if (isPayReferral) {
            IReferral(referralContract).payReferralUSDAdmin(
                _value,
                _msgSender,
                _referrer
            );
        }

        if (isPayRewardTokens) {
            _transferTokensFrom(
                rewardTokenContract,
                rewardOwner,
                IReferral(referralContract).getUserReferrerAddress(_msgSender),
                _rewardValue
            );
            emit RewardTokenDistributed(
                IReferral(referralContract).getUserReferrerAddress(_msgSender),
                _rewardValue,
                rewardTokenContract
            );
        }

        _updateTokenSale(_msgSender, _tokenValue, _value, "USDT");
    }

    function pauseAdmin() external onlyOwner {
        _pause();
    }

    function unpauseAdmin() external onlyOwner {
        _unpause();
    }

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
