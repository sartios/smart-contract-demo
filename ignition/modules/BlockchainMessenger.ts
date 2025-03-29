import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BlockchainMessengerModule = buildModule("BlockchainMessengerModule", (m) => {
  const blockchainMessenger = m.contract("BlockchainMessenger", []);

  return { blockchainMessenger };
});

export default BlockchainMessengerModule;