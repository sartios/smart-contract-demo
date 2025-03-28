import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SolidityDataTypesModule = buildModule("SolidityDataTypesModule", (m) => {
  const solidityDataTypes = m.contract("SolidityDataTypes", []);

  return { solidityDataTypes };
});

export default SolidityDataTypesModule;