import { type ContractRunner } from "ethers";
import type { IDecryptionOracle, IDecryptionOracleInterface } from "../../../../../@fhevm/solidity/lib/FHE.sol/IDecryptionOracle";
export declare class IDecryptionOracle__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "requestID";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32[]";
            readonly name: "ctsHandles";
            readonly type: "bytes32[]";
        }, {
            readonly internalType: "bytes4";
            readonly name: "callbackSelector";
            readonly type: "bytes4";
        }];
        readonly name: "requestDecryption";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }];
    static createInterface(): IDecryptionOracleInterface;
    static connect(address: string, runner?: ContractRunner | null): IDecryptionOracle;
}
//# sourceMappingURL=IDecryptionOracle__factory.d.ts.map