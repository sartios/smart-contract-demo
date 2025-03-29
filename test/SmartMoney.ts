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
    const initialContractBalance = await hre.ethers.provider.getBalance(smartMoney.target);
    expect(initialContractBalance).to.equal(hre.ethers.parseEther("1"));

    const [caller] = await hre.ethers.getSigners();
    const initialCallerBalance = await hre.ethers.provider.getBalance(caller.address);

    await smartMoney.withdrawAll();
    const currentCallerBalance = await hre.ethers.provider.getBalance(caller.address);
    expect(currentCallerBalance).to.be.gt(initialCallerBalance);

    const newBalance = await hre.ethers.provider.getBalance(smartMoney.target);
    expect(newBalance).to.equal(0);
  });

  it("should allow withdrawals to an address", async () => {
    const initialBalance = await hre.ethers.provider.getBalance(smartMoney.target);
    expect(initialBalance).to.equal(hre.ethers.parseEther("1"));

    const [caller, thirdParty] = await hre.ethers.getSigners();
    const initialCallerBalance = await hre.ethers.provider.getBalance(caller.address);
    const initialThirdPartyBalance = await hre.ethers.provider.getBalance(thirdParty.address);

    await smartMoney.withdrawTo(thirdParty.address);

    const newBalance = await hre.ethers.provider.getBalance(smartMoney.target);
    expect(newBalance).to.equal(0);

    const currentCallerBalance = await hre.ethers.provider.getBalance(caller.address);
    expect(currentCallerBalance).to.be.lt(initialCallerBalance);

    const currentThirdPartyBalance = await hre.ethers.provider.getBalance(thirdParty.address);
    expect(currentThirdPartyBalance).to.be.gt(initialThirdPartyBalance);
  });

  it("should return deposit history", async () => {
    const [caller] = await hre.ethers.getSigners();

    const deposits = await smartMoney.getDeposits();
    expect(deposits.length).to.equal(1);
    expect(deposits[0].amount).to.equal(hre.ethers.parseEther("1"));
    expect(deposits[0].recipient).to.equal(caller.address);
    expect(deposits[0].timestamp).to.exist;
  });

  it("should return withdrawal history", async () => {
    const [, thirdParty] = await hre.ethers.getSigners();
    await smartMoney.withdrawTo(thirdParty.address);

    const withdrawals = await smartMoney.getWithdrawals();
    expect(withdrawals.length).to.equal(1);
    expect(withdrawals[0].amount).to.equal(hre.ethers.parseEther("1"));
    expect(withdrawals[0].recipient).to.equal(thirdParty.address);
    expect(withdrawals[0].timestamp).to.exist;
  });

  it("should set/get user identity", async () => {
    const [, thirdParty, randomUser] = await hre.ethers.getSigners();

    await smartMoney.setUserIdentity("Alice", "alice@eth.com");
    await smartMoney.connect(thirdParty).setUserIdentity("Bob", "bob@eth.com");

    expect(await smartMoney.getUserIdentity()).to.deep.equal(["Alice", "alice@eth.com"]);
    expect(await smartMoney.connect(thirdParty).getUserIdentity()).to.deep.equal(["Bob", "bob@eth.com"]);
    expect(await smartMoney.connect(randomUser).getUserIdentity()).to.deep.equal(["", ""]);
  });
});
