import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SmartMoneyModule = buildModule("SmartMoneyModule", (m) => {
  const smartMoney = m.contract("SmartMoney", []);

  return { smartMoney };
});

export default SmartMoneyModule;