import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SolidityFallbackTypesModule = buildModule("SolidityFallbackTypesModule", (m) => {
  const solidityFallbackTypes = m.contract("SolidityFallbackTypes", []);

  return { solidityFallbackTypes };
});

export default SolidityFallbackTypesModule;