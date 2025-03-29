import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ErrorHandlingModule = buildModule("ErrorHandlingModule", (m) => {
  const errorHandling = m.contract("ErrorHandling", []);

  return { errorHandling };
});

export default ErrorHandlingModule;
