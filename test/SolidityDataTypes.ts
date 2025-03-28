import hre from "hardhat";
import { expect } from "chai";

describe("SolidityDataTypes", function () {
  let solidityDataTypes: any;
  beforeEach(async () => {
    solidityDataTypes = await hre.ethers.deployContract("SolidityDataTypes", []);
  });

  it("should return the boolean default value", async () => {
    expect(await solidityDataTypes.myBool()).to.equal(false);
  });

  it("should update the boolean value", async () => {
    await solidityDataTypes.setMyBool(true);
    expect(await solidityDataTypes.myBool()).to.equal(true);
  });

  it("should return the uint default value", async () => {
    expect(await solidityDataTypes.myUint()).to.equal(0);
  });

  it("should update the uint value", async () => {
    await solidityDataTypes.setMyUint(42);
    expect(await solidityDataTypes.myUint()).to.equal(42);
  });

  it("should throw an error when setting a negative uint", async () => {
    await expect(solidityDataTypes.setMyUint(-100)).to.be.rejectedWith(`value out-of-bounds`);
  });

  it("should throw an error when overflowing uint", async () => {
    const maxUint = hre.ethers.MaxUint256 + BigInt(1);
    await expect(solidityDataTypes.setMyUint(maxUint)).to.be.rejectedWith(`value out-of-bounds`);
  });
});
