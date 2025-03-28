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
    expect(await solidityDataTypes.myUint256()).to.equal(0);
  });

  it("should update the uint value", async () => {
    await solidityDataTypes.setMyUint256(42);
    expect(await solidityDataTypes.myUint256()).to.equal(42);
  });

  it("should throw an error when setting a negative uint", async () => {
    await expect(solidityDataTypes.setMyUint256(-100)).to.be.rejectedWith(`value out-of-bounds`);
  });

  it("should throw an error when overflowing uint", async () => {
    const maxUint = hre.ethers.MaxUint256 + BigInt(1);
    await expect(solidityDataTypes.setMyUint256(maxUint)).to.be.rejectedWith(`value out-of-bounds`);
  });

  it("should return the int default value", async () => {
    expect(await solidityDataTypes.myInt()).to.equal(0);
  });

  it("should update the int value", async () => {
    await solidityDataTypes.setMyInt(-42);
    expect(await solidityDataTypes.myInt()).to.equal(-42);
  });

  it("should throw an error when overflowing the int", async () => {
    const maxInt = hre.ethers.MaxInt256 + BigInt(1);
    await expect(solidityDataTypes.setMyInt(maxInt)).to.be.rejectedWith(`value out-of-bounds`);
  });

  it("should rollover around", async () => {
    expect(await solidityDataTypes.myUint8()).to.equal(0);
    await solidityDataTypes.decreaseMyUint8();
    expect(await solidityDataTypes.myUint8()).to.equal(255);
  });
});
