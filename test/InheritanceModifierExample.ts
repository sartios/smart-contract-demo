import hre from "hardhat";
import { expect } from "chai";

describe("InheritanceModifierExample", function () {
  let inheritanceModifierExample: any;
  beforeEach(async () => {
    inheritanceModifierExample = await hre.ethers.deployContract("InheritanceModifierExample", []);
  });

  it("should set the default owner balance on creation", async () => {
    const [owner] = await hre.ethers.getSigners();
    expect(await inheritanceModifierExample.balances(owner.address)).to.equal(100);
  });

  it("should allow the owner to create new token", async () => {
    const [owner] = await hre.ethers.getSigners();
    expect(await inheritanceModifierExample.balances(owner.address)).to.equal(100);
    await inheritanceModifierExample.createNewToken();
    expect(await inheritanceModifierExample.balances(owner.address)).to.equal(101);
  });

  it("should not allow the any other then owner to create new token", async () => {
    const [owner, thirdParty] = await hre.ethers.getSigners();
    expect(await inheritanceModifierExample.balances(owner.address)).to.equal(100);
    await expect(inheritanceModifierExample.connect(thirdParty).createNewToken()).to.be.revertedWith(
      "Not the contract owner"
    );
    expect(await inheritanceModifierExample.balances(owner.address)).to.equal(100);
  });

  it("should allow the owner to burn token", async () => {
    const [owner] = await hre.ethers.getSigners();
    expect(await inheritanceModifierExample.balances(owner.address)).to.equal(100);
    await inheritanceModifierExample.burnToken();
    expect(await inheritanceModifierExample.balances(owner.address)).to.equal(99);
  });

  it("should not allow the any other then owner to burn token", async () => {
    const [owner, thirdParty] = await hre.ethers.getSigners();
    expect(await inheritanceModifierExample.balances(owner.address)).to.equal(100);
    await expect(inheritanceModifierExample.connect(thirdParty).burnToken()).to.be.revertedWith(
      "Not the contract owner"
    );
    expect(await inheritanceModifierExample.balances(owner.address)).to.equal(100);
  });
});
