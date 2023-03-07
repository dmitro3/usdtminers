const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("TotheMars Token contract", function () {

  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory("ToTheMars");
    const [owner, addr1, addr2] = await ethers.getSigners();

    const hardhatToken = await Token.deploy();

    await hardhatToken.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { Token, hardhatToken, owner, addr1, addr2 };
  };

  it("Name should be 'To The Mars'", async function () {
    const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

    const name = await hardhatToken.name();
    expect(await hardhatToken.name()).to.equal("To The Mars");
  });

  it("Symbol should be 'MARTIAN'", async function () {
    const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

    const symbol = await hardhatToken.symbol();
    expect(await hardhatToken.symbol()).to.equal("MARTIAN");
  });

  it("Decimals should be 18", async function () {
    const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

    const decimals = await hardhatToken.decimals();
    expect(await hardhatToken.decimals()).to.equal(18);
  });

  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Transfer", async function () {
    const { hardhatToken, owner, addr1 } = await loadFixture(deployTokenFixture);

    const ownerBalance = await hardhatToken.transfer(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});