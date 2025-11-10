import { type ContractRunner } from "ethers";
import type { IInputVerifier, IInputVerifierInterface } from "../../../../../@fhevm/solidity/lib/Impl.sol/IInputVerifier";
export declare class IInputVerifier__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "cleanTransientStorage";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IInputVerifierInterface;
    static connect(address: string, runner?: ContractRunner | null): IInputVerifier;
}
//# sourceMappingURL=IInputVerifier__factory.d.ts.map