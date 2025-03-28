import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const HelloWorldModule = buildModule("HelloWorldModule", (m) => {
  const helloWorld = m.contract("HelloWorld", ["Hello world"]);

  return { helloWorld };
});

export default HelloWorldModule;