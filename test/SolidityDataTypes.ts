import hre from "hardhat";
import { expect } from "chai";

describe("SolidityDataTypes", function () {
  let solidityDataTypes: any;
  beforeEach(async () => {
    solidityDataTypes = await hre.ethers.deployContract("SolidityDataTypes", []);
  });

  it("should assign the owner of the contract", async () => {
    const [owner] = await hre.ethers.getSigners();
    const contractOwner = await solidityDataTypes.owner();
    expect(contractOwner).to.equal(owner.address);
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

  it("should return the default value of the string", async () => {
    expect(await solidityDataTypes.myString()).to.equal("");
  });

  it("should update the string value", async () => {
    await solidityDataTypes.setMyString("Hello, World!");
    expect(await solidityDataTypes.myString()).to.equal("Hello, World!");
  });

  it("should compare two strings", async () => {
    await solidityDataTypes.setMyString("Hello");
    expect(await solidityDataTypes.compareStrings("Hello")).to.equal(true);
    expect(await solidityDataTypes.compareStrings("World")).to.equal(false);
  });

  it("should return the default value of the bytes32", async () => {
    expect(await solidityDataTypes.myBytes()).to.equal("0x");
  });

  it("should update the bytes32 value", async () => {
    const bytesValue = hre.ethers.toUtf8Bytes("Hello, World!");
    await solidityDataTypes.setMyBytes(bytesValue);
    expect(await solidityDataTypes.myBytes()).to.equal(hre.ethers.hexlify(bytesValue));
    expect(hre.ethers.toUtf8String(await solidityDataTypes.myBytes())).to.equal("Hello, World!");
  });

  it("should return the default value of address", async () => {
    expect(await solidityDataTypes.myAddress()).to.equal("0x0000000000000000000000000000000000000000");
  });

  it("should update the address value", async () => {
    const [owner] = await hre.ethers.getSigners();
    await solidityDataTypes.setMyAddress(owner.address);
    expect(await solidityDataTypes.myAddress()).to.equal(owner.address);
  });

  it("should return the address balance", async () => {
    expect(await solidityDataTypes.getAddressBalance()).to.equal(0);
  });

  it("should set the message sender address", async () => {
    const [owner, otherAccount] = await hre.ethers.getSigners();
    await solidityDataTypes.updateMessageSender();
    expect(await solidityDataTypes.messageSender()).to.equal(owner.address);

    await solidityDataTypes.connect(otherAccount).updateMessageSender();
    expect(await solidityDataTypes.messageSender()).to.equal(otherAccount.address);
  });

  it("should call a pure function", async () => {
    const result = await solidityDataTypes.multiply(2, 3);
    expect(result).to.equal(6);
  });
});
