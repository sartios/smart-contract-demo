import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SolidityDataTypesModule = buildModule("SolidityDataTypesModule", (m) => {
  const ownerName = m.getParameter("name", "Default owner name");

  const solidityDataTypes = m.contract("SolidityDataTypes", [ownerName]);

  return { solidityDataTypes };
});

export default SolidityDataTypesModule;
