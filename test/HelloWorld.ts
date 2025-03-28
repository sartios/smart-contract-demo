import hre from "hardhat";
import { expect } from "chai";

describe("HelloWorld", function () {
  let helloWorld: any;
  beforeEach(async () => {
    helloWorld = await hre.ethers.deployContract("HelloWorld", [
      "Hello, World!",
    ]);
  });

  it("should return the greeting passed to the constructor", async () => {
    expect(await helloWorld.greeting()).to.equal("Hello, World!");
  });

  it("should update the greeting", async () => {
    await helloWorld.setGreeting("Hello, Ethereum!");
    expect(await helloWorld.greeting()).to.equal("Hello, Ethereum!");
  });
});
