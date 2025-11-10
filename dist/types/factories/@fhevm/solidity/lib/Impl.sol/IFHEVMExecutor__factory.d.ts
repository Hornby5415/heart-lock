import { type ContractRunner } from "ethers";
import type { IFHEVMExecutor, IFHEVMExecutorInterface } from "../../../../../@fhevm/solidity/lib/Impl.sol/IFHEVMExecutor";
export declare class IFHEVMExecutor__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "ct";
            readonly type: "bytes32";
        }, {
            readonly internalType: "enum FheType";
            readonly name: "toType";
            readonly type: "uint8";
        }];
        readonly name: "cast";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "lhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "rhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes1";
            readonly name: "scalarByte";
            readonly type: "bytes1";
        }];
        readonly name: "fheAdd";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "lhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "rhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes1";
            readonly name: "scalarByte";
            readonly type: "bytes1";
        }];
        readonly name: "fheBitAnd";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "lhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "rhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes1";
            readonly name: "scalarByte";
            readonly type: "bytes1";
        }];
        readonly name: "fheBitOr";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "lhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "rhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes1";
            readonly name: "scalarByte";
            readonly type: "bytes1";
        }];
        readonly name: "fheBitXor";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "lhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "rhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes1";
            readonly name: "scalarByte";
            readonly type: "bytes1";
        }];
        readonly name: "fheDiv";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "lhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "rhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes1";
            readonly name: "scalarByte";
            readonly type: "bytes1";
        }];
        readonly name: "fheEq";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "lhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "rhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes1";
            readonly name: "scalarByte";
            readonly type: "bytes1";
        }];
        readonly name: "fheGe";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "lhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "rhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes1";
            readonly name: "scalarByte";
            readonly type: "bytes1";
        }];
        readonly name: "fheGt";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "control";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "ifTrue";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "ifFalse";
            readonly type: "bytes32";
        }];
        readonly name: "fheIfThenElse";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "lhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "rhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes1";
            readonly name: "scalarByte";
            readonly type: "bytes1";
        }];
        readonly name: "fheLe";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "lhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "rhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes1";
            readonly name: "scalarByte";
            readonly type: "bytes1";
        }];
        readonly name: "fheLt";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "lhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "rhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes1";
            readonly name: "scalarByte";
            readonly type: "bytes1";
        }];
        readonly name: "fheMax";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "lhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "rhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes1";
            readonly name: "scalarByte";
            readonly type: "bytes1";
        }];
        readonly name: "fheMin";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "lhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "rhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes1";
            readonly name: "scalarByte";
            readonly type: "bytes1";
        }];
        readonly name: "fheMul";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "lhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "rhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes1";
            readonly name: "scalarByte";
            readonly type: "bytes1";
        }];
        readonly name: "fheNe";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "ct";
            readonly type: "bytes32";
        }];
        readonly name: "fheNeg";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "ct";
            readonly type: "bytes32";
        }];
        readonly name: "fheNot";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "enum FheType";
            readonly name: "randType";
            readonly type: "uint8";
        }];
        readonly name: "fheRand";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "upperBound";
            readonly type: "uint256";
        }, {
            readonly internalType: "enum FheType";
            readonly name: "randType";
            readonly type: "uint8";
        }];
        readonly name: "fheRandBounded";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "lhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "rhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes1";
            readonly name: "scalarByte";
            readonly type: "bytes1";
        }];
        readonly name: "fheRem";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "lhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "rhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes1";
            readonly name: "scalarByte";
            readonly type: "bytes1";
        }];
        readonly name: "fheRotl";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "lhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "rhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes1";
            readonly name: "scalarByte";
            readonly type: "bytes1";
        }];
        readonly name: "fheRotr";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "lhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "rhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes1";
            readonly name: "scalarByte";
            readonly type: "bytes1";
        }];
        readonly name: "fheShl";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "lhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "rhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes1";
            readonly name: "scalarByte";
            readonly type: "bytes1";
        }];
        readonly name: "fheShr";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "lhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "rhs";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes1";
            readonly name: "scalarByte";
            readonly type: "bytes1";
        }];
        readonly name: "fheSub";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getInputVerifierAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "ct";
            readonly type: "uint256";
        }, {
            readonly internalType: "enum FheType";
            readonly name: "toType";
            readonly type: "uint8";
        }];
        readonly name: "trivialEncrypt";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "inputHandle";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "callerAddress";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "inputProof";
            readonly type: "bytes";
        }, {
            readonly internalType: "enum FheType";
            readonly name: "inputType";
            readonly type: "uint8";
        }];
        readonly name: "verifyCiphertext";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "result";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IFHEVMExecutorInterface;
    static connect(address: string, runner?: ContractRunner | null): IFHEVMExecutor;
}
//# sourceMappingURL=IFHEVMExecutor__factory.d.ts.map