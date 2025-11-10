import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { FHE, FHEInterface } from "../../../../../@fhevm/solidity/lib/FHE.sol/FHE";
type FHEConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class FHE__factory extends ContractFactory {
    constructor(...args: FHEConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<FHE & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): FHE__factory;
    static readonly bytecode = "0x602c6032600b8282823980515f1a607314602657634e487b7160e01b5f525f60045260245ffd5b305f52607381538281f3fe730000000000000000000000000000000000000000301460806040525f5ffdfea164736f6c634300081b000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "HandlesAlreadySavedForRequestID";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidKMSSignatures";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NoHandleFoundForRequestID";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "requestID";
            readonly type: "uint256";
        }];
        readonly name: "DecryptionFulfilled";
        readonly type: "event";
    }];
    static createInterface(): FHEInterface;
    static connect(address: string, runner?: ContractRunner | null): FHE;
}
export {};
//# sourceMappingURL=FHE__factory.d.ts.map