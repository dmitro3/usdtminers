require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");

/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const BSC_API_KEY = process.env.BSC_API_KEY;
const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://bscscan.com/
    apiKey: {
      polygon: POLYGON_API_KEY,
      polygonMumbai: POLYGON_API_KEY,
      bsc: BSC_API_KEY,
      bscTestnet: BSC_API_KEY,
    },
    // apiKey: BSC_API_KEY,
  },

  defaultNetwork: "bscTestnet",
  // defaultNetwork: "hardhat",
  // defaultNetwork: "ganache",
  networks: {
    hardhat: {
      gas: "auto",
      gasPrice: 10000000000,
    },

    ganache: {
      url: "HTTP://127.0.0.1:7545",
      chainId: 1337,
      // accounts: [GANACHE_PRIVATE_KEY],
      accounts: [PRIVATE_KEY],
      gas: "auto",
      gasPrice: 10000000000,
    },

    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      accounts: [PRIVATE_KEY],
      gas: "auto",
      gasPrice: 5000000000,
    },

    bscTestnet: {
      url: "https://data-seed-prebsc-1-s3.binance.org:8545",
      chainId: 97,
      accounts: [PRIVATE_KEY],
      gas: "auto",
      gasPrice: 10000000000,
    },
    polygon: {
      url: "https://polygon-rpc.com",
      chainId: 137,
      accounts: [PRIVATE_KEY],
    },
    mumbai: {
      url: "https://matic-mumbai.chainstacklabs.com",
      chainId: 80001,
      accounts: [PRIVATE_KEY],
    },
  },
};
