import hre from "hardhat";
import { expect } from "chai";

describe("SmartMoney", function () {
  let smartMoney: any;
  beforeEach(async () => {
    smartMoney = await hre.ethers.deployContract("SmartMoney", [], { value: hre.ethers.parseEther("1") });
    await smartMoney.waitForDeployment();
  });

  it("it should allow money deposits", async () => {
    const initialBalance = await hre.ethers.provider.getBalance(smartMoney.target);
    expect(initialBalance).to.equal(hre.ethers.parseEther("1"));

    const depositAmount = hre.ethers.parseEther("0.5");
    await smartMoney.deposit({ value: depositAmount });

    const newBalance = await hre.ethers.provider.getBalance(smartMoney.target);
    expect(newBalance).to.equal(hre.ethers.parseEther("1.5"));
  });

  it("should allow withdrawing the whole amount", async () => {
    const initialBalance = await hre.ethers.provider.getBalance(smartMoney.target);
    expect(initialBalance).to.equal(hre.ethers.parseEther("1"));

    const [, caller] = await hre.ethers.getSigners();
    const initialCallerBalance = await hre.ethers.provider.getBalance(caller.address);

    await smartMoney.connect(caller).withdrawAll();

    const newBalance = await hre.ethers.provider.getBalance(smartMoney.target);
    expect(newBalance).to.equal(0);

    const currentCallerBalance = await hre.ethers.provider.getBalance(caller.address);
    expect(currentCallerBalance).to.be.gt(initialCallerBalance);
  });

  it("should allow withdrawals to an address", async () => {
    const initialBalance = await hre.ethers.provider.getBalance(smartMoney.target);
    expect(initialBalance).to.equal(hre.ethers.parseEther("1"));

    const [, caller, thirdParty] = await hre.ethers.getSigners();
    const initialCallerBalance = await hre.ethers.provider.getBalance(caller.address);
    const initialThirdPartyBalance = await hre.ethers.provider.getBalance(thirdParty.address);

    await smartMoney.connect(caller).withdrawTo(thirdParty.address);

    const newBalance = await hre.ethers.provider.getBalance(smartMoney.target);
    expect(newBalance).to.equal(0);

    const currentCallerBalance = await hre.ethers.provider.getBalance(caller.address);
    expect(currentCallerBalance).to.be.lt(initialCallerBalance);

    const currentThirdPartyBalance = await hre.ethers.provider.getBalance(thirdParty.address);
    expect(currentThirdPartyBalance).to.be.gt(initialThirdPartyBalance);
  });
});
