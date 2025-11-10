import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { EthereumConfig, EthereumConfigInterface } from "../../../../../@fhevm/solidity/config/ZamaConfig.sol/EthereumConfig";
type EthereumConfigConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class EthereumConfig__factory extends ContractFactory {
    constructor(...args: EthereumConfigConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<EthereumConfig & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): EthereumConfig__factory;
    static readonly bytecode = "0x608060405234801561000f575f5ffd5b5061013661005a60408051608080820183525f808352602080840182905283850182905260609384018290528451928301855281835282018190529281018390529081019190915290565b80517f9e7b61f58c47dc699ac88507c4f5bb9f121c03808c5676a8078fe583e464970080546001600160a01b03199081166001600160a01b039384161790915560208301517f9e7b61f58c47dc699ac88507c4f5bb9f121c03808c5676a8078fe583e46497018054831691841691909117905560408301517f9e7b61f58c47dc699ac88507c4f5bb9f121c03808c5676a8078fe583e46497028054831691841691909117905560608301517f9e7b61f58c47dc699ac88507c4f5bb9f121c03808c5676a8078fe583e46497038054909216921691909117905550565b604b806101425f395ff3fe6080604052348015600e575f5ffd5b50600436106026575f3560e01c8063da1f12ab14602a575b5f5ffd5b600160405190815260200160405180910390f3fea164736f6c634300081b000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "protocolId";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }];
    static createInterface(): EthereumConfigInterface;
    static connect(address: string, runner?: ContractRunner | null): EthereumConfig;
}
export {};
//# sourceMappingURL=EthereumConfig__factory.d.ts.map