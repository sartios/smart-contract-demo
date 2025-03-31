import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const InheritanceModifierExampleModule = buildModule("InheritanceModifierExampleModule", (m) => {
  const inheritanceModifierExample = m.contract("InheritanceModifierExample", []);

  return { inheritanceModifierExample };
});

export default InheritanceModifierExampleModule;
