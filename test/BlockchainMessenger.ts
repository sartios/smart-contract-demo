import hre from "hardhat";
import { expect } from "chai";

describe("BlockchainMessenger", function () {
  let blockchainMessenger: any;
  beforeEach(async () => {
    blockchainMessenger = await hre.ethers.deployContract("BlockchainMessenger", []);
  });

  it("should assign the owner of the contract", async () => {
    const [owner] = await hre.ethers.getSigners();
    const contractOwner = await blockchainMessenger.owner();
    expect(contractOwner).to.equal(owner.address);
  });

  it("should return the default value of the message", async () => {
    expect(await blockchainMessenger.message()).to.equal("");
  });

  it("should allow owner to update the message value", async () => {
    await blockchainMessenger.updateMessage("Hello, Blockchain!");
    expect(await blockchainMessenger.message()).to.equal("Hello, Blockchain!");
    expect(await blockchainMessenger.changeCounter()).to.equal(1);
  });

  it("should not allow non-owner to update the message", async () => {
    expect(await blockchainMessenger.changeCounter()).to.equal(0);
    await blockchainMessenger.updateMessage("Hello, Blockchain!");
    expect(await blockchainMessenger.message()).to.equal("Hello, Blockchain!");
    expect(await blockchainMessenger.changeCounter()).to.equal(1);

    const [_, nonOwner] = await hre.ethers.getSigners();
    await expect(blockchainMessenger.connect(nonOwner).updateMessage("Unauthorized")).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );

    expect(await blockchainMessenger.message()).to.equal("Hello, Blockchain!");
    expect(await blockchainMessenger.changeCounter()).to.equal(1);
  });
});
