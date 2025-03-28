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
});
