import hre from "hardhat";
import { expect } from "chai";

describe("ErrorHandling", function () {
  let errorHandling: any;
  beforeEach(async () => {
    errorHandling = await hre.ethers.deployContract("ErrorHandling", []);
    await errorHandling.waitForDeployment();
  });

  it("should emit an event for validation error", async () => {
    await expect(errorHandling.catchValidationError())
      .to.emit(errorHandling, "ValidationError")
      .withArgs("This function always throws");
  });

  it("should emit an event for assertion error", async () => {
    await expect(errorHandling.catchAssertionError()).to.emit(errorHandling, "AssertionError").withArgs(BigInt(1));
  });

  it("should emit an event for custom error", async () => {
    await expect(errorHandling.catchCustomError())
      .to.emit(errorHandling, "CustomError")
      .withArgs(
        "0xb94e62a10000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000a4e6f74416c6c6f77656400000000000000000000000000000000000000000000"
      );
    expect(hre.ethers.toUtf8String("0x4e6f74416c6c6f776564")).to.equal("NotAllowed");
  });
});
