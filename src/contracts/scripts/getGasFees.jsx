const { ethers, upgrades } = require("hardhat");

async function main() {
  const gas = await ethers.provider.getGasPrice();

  console.log("Gas price is ", gas);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
