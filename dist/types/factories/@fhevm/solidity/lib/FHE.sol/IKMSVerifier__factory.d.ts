import { type ContractRunner } from "ethers";
import type { IKMSVerifier, IKMSVerifierInterface } from "../../../../../@fhevm/solidity/lib/FHE.sol/IKMSVerifier";
export declare class IKMSVerifier__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes32[]";
            readonly name: "handlesList";
            readonly type: "bytes32[]";
        }, {
            readonly internalType: "bytes";
            readonly name: "decryptedResult";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "decryptionProof";
            readonly type: "bytes";
        }];
        readonly name: "verifyDecryptionEIP712KMSSignatures";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IKMSVerifierInterface;
    static connect(address: string, runner?: ContractRunner | null): IKMSVerifier;
}
//# sourceMappingURL=IKMSVerifier__factory.d.ts.map