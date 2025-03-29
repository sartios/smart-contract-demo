import hre from "hardhat";
import { expect } from "chai";

describe("SolidityFallback", function () {
  let solidityFallback: any;
  beforeEach(async () => {
    solidityFallback = await hre.ethers.deployContract("SolidityFallback", []);
    await solidityFallback.waitForDeployment();
  });

  it("should call receive when sending ether to contract", async () => {
    const contractAddress = solidityFallback.target;
    const initialBalance = await hre.ethers.provider.getBalance(contractAddress);
    expect(initialBalance).to.equal(0);

    const [deployer] = await hre.ethers.getSigners();
    await deployer.sendTransaction({ to: solidityFallback.target, value: hre.ethers.parseEther("1") });

    expect(await solidityFallback.lastValueSent()).to.equal(hre.ethers.parseEther("1"));
    expect(await solidityFallback.lastFunctionCalled()).to.equal("receive");

    const currentBalance = await hre.ethers.provider.getBalance(contractAddress);
    expect(currentBalance).to.equal(hre.ethers.parseEther("1"));
  });

  it("should call fallback when sending ether to unknown function", async () => {
    const contractAddress = solidityFallback.target;
    const initialBalance = await hre.ethers.provider.getBalance(contractAddress);
    expect(initialBalance).to.equal(0);

    const [deployer] = await hre.ethers.getSigners();
    await deployer.sendTransaction({ to: solidityFallback.target, value: hre.ethers.parseEther("1"), data: "0x1234" });

    expect(await solidityFallback.lastValueSent()).to.equal(hre.ethers.parseEther("1"));
    expect(await solidityFallback.lastFunctionCalled()).to.equal("fallback");

    const currentBalance = await hre.ethers.provider.getBalance(contractAddress);
    expect(currentBalance).to.equal(hre.ethers.parseEther("1"));
  });
});
