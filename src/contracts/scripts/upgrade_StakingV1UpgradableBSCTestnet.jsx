const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const gas = await ethers.provider.getGasPrice();
  console.log("Gas price is ", gas);

  console.log("Deploying contracts with the account:", deployer.address);
  const balance = await deployer.getBalance();
  const formatedBalance = ethers.utils.formatEther(balance);

  console.log("Account balance:", formatedBalance.toString(), "ETH");

  const Token = await ethers.getContractFactory("StakingV1Upgradable");
  const mc = await upgrades.upgradeProxy(
    "0x48F2C09424A5d3C8bCfB92E9D6ad9336935DF04b",
    Token,
    { gasPrice: gas }
  );

  await mc.deployed();
  console.log("Contract deployed to:", mc.address);

  const newBalance = await deployer.getBalance();
  const newFormatedBalance = ethers.utils.formatEther(newBalance);
  const gasFeesUsed = Number(formatedBalance) - Number(newFormatedBalance);

  console.log("Total gas fees used:", gasFeesUsed.toString(), "ETH");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
