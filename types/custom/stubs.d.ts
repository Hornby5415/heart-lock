declare module "debug" {
  type Debugger = (...args: unknown[]) => void;
  function createDebugger(namespace: string): Debugger;
  export default createDebugger;
  export = createDebugger;
}

declare module "ws" {
  const WebSocket: any;
  export = WebSocket;
}

declare module "sha1" {
  export default function sha1(input: unknown): string;
}

declare module "fs-extra" {
  const fsExtra: any;
  export = fsExtra;
}

declare module "aes-js/lib.commonjs/index" {
  export const ModeOfOperation: Record<string, any>;
  export const utils: Record<string, any>;
  const aesJs: Record<string, any>;
  export default aesJs;
}

declare module "@ethersproject/*" {
  const moduleExports: any;
  export = moduleExports;
}

declare module "hardhat-deploy" {
  const deploy: any;
  export = deploy;
}

declare module "hardhat-deploy/types" {
  const deployTypes: any;
  export = deployTypes;
}

declare module "@fhevm/mock-utils/ethers/FhevmMockProvider" {
  const mockProvider: any;
  export = mockProvider;
}

declare const window: any;









