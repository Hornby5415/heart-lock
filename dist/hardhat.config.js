"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@fhevm/hardhat-plugin");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
require("@typechain/hardhat");
require("hardhat-deploy");
require("hardhat-gas-reporter");
const config_1 = require("hardhat/config");
require("solidity-coverage");
require("./tasks/accounts");
require("./tasks/EncryptedPeerReview");
const MNEMONIC = config_1.vars.get("MNEMONIC", "test test test test test test test test test test test junk");
const PRIVATE_KEY = config_1.vars.get("PRIVATE_KEY", "");
const INFURA_API_KEY = config_1.vars.get("INFURA_API_KEY", "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
const MNEMONIC_ACCOUNTS = {
    mnemonic: MNEMONIC,
    path: "m/44'/60'/0'/0/",
    count: 10,
};
const PRIVATE_KEY_ACCOUNT = PRIVATE_KEY
    ? [PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`]
    : undefined;
const config = {
    defaultNetwork: "hardhat",
    namedAccounts: {
        deployer: 0,
    },
    etherscan: {
        apiKey: {
            sepolia: config_1.vars.get("ETHERSCAN_API_KEY", ""),
        },
    },
    gasReporter: {
        currency: "USD",
        enabled: process.env.REPORT_GAS ? true : false,
        excludeContracts: [],
    },
    networks: {
        hardhat: {
            accounts: {
                mnemonic: MNEMONIC,
            },
            chainId: 31337,
        },
        anvil: {
            accounts: MNEMONIC_ACCOUNTS,
            chainId: 31337,
            url: "http://localhost:8545",
        },
        sepolia: {
            accounts: PRIVATE_KEY_ACCOUNT ?? MNEMONIC_ACCOUNTS,
            chainId: 11155111,
            url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
        },
    },
    paths: {
        artifacts: "./artifacts",
        cache: "./cache",
        sources: "./contracts",
        tests: "./test",
    },
    solidity: {
        version: "0.8.27",
        settings: {
            metadata: {
                bytecodeHash: "none",
            },
            optimizer: {
                enabled: true,
                runs: 800,
            },
            evmVersion: "cancun",
        },
    },
    typechain: {
        outDir: "types",
        target: "ethers-v6",
    },
};
exports.default = config;
//# sourceMappingURL=hardhat.config.js.map