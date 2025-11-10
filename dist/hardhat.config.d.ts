import "@fhevm/hardhat-plugin";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "@typechain/hardhat";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import type { HardhatUserConfig } from "hardhat/config";
import "solidity-coverage";
import "./tasks/accounts";
import "./tasks/EncryptedPeerReview";
declare const config: HardhatUserConfig;
export default config;
//# sourceMappingURL=hardhat.config.d.ts.map