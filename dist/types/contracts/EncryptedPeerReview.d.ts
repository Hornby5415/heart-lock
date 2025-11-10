import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../common";
export interface EncryptedPeerReviewInterface extends Interface {
    getFunction(nameOrSignature: "getEncryptedAverage" | "getEncryptedTotal" | "getMyScore" | "hasSubmitted" | "manager" | "participantCount" | "protocolId" | "requestAverageAccess" | "requestMyScoreAccess" | "requestTotalAccess" | "submitScore"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "ScoreSubmitted"): EventFragment;
    encodeFunctionData(functionFragment: "getEncryptedAverage", values?: undefined): string;
    encodeFunctionData(functionFragment: "getEncryptedTotal", values?: undefined): string;
    encodeFunctionData(functionFragment: "getMyScore", values?: undefined): string;
    encodeFunctionData(functionFragment: "hasSubmitted", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "manager", values?: undefined): string;
    encodeFunctionData(functionFragment: "participantCount", values?: undefined): string;
    encodeFunctionData(functionFragment: "protocolId", values?: undefined): string;
    encodeFunctionData(functionFragment: "requestAverageAccess", values?: undefined): string;
    encodeFunctionData(functionFragment: "requestMyScoreAccess", values?: undefined): string;
    encodeFunctionData(functionFragment: "requestTotalAccess", values?: undefined): string;
    encodeFunctionData(functionFragment: "submitScore", values: [BytesLike, BytesLike]): string;
    decodeFunctionResult(functionFragment: "getEncryptedAverage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getEncryptedTotal", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getMyScore", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasSubmitted", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "manager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "participantCount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "protocolId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "requestAverageAccess", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "requestMyScoreAccess", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "requestTotalAccess", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "submitScore", data: BytesLike): Result;
}
export declare namespace ScoreSubmittedEvent {
    type InputTuple = [reviewer: AddressLike, updated: boolean];
    type OutputTuple = [reviewer: string, updated: boolean];
    interface OutputObject {
        reviewer: string;
        updated: boolean;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface EncryptedPeerReview extends BaseContract {
    connect(runner?: ContractRunner | null): EncryptedPeerReview;
    waitForDeployment(): Promise<this>;
    interface: EncryptedPeerReviewInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    getEncryptedAverage: TypedContractMethod<[
    ], [
        [string, bigint] & {
            average: string;
            count: bigint;
        }
    ], "view">;
    getEncryptedTotal: TypedContractMethod<[
    ], [
        [string, bigint] & {
            total: string;
            count: bigint;
        }
    ], "view">;
    getMyScore: TypedContractMethod<[], [string], "view">;
    hasSubmitted: TypedContractMethod<[reviewer: AddressLike], [boolean], "view">;
    manager: TypedContractMethod<[], [string], "view">;
    participantCount: TypedContractMethod<[], [bigint], "view">;
    protocolId: TypedContractMethod<[], [bigint], "view">;
    requestAverageAccess: TypedContractMethod<[], [void], "nonpayable">;
    requestMyScoreAccess: TypedContractMethod<[], [void], "nonpayable">;
    requestTotalAccess: TypedContractMethod<[], [void], "nonpayable">;
    submitScore: TypedContractMethod<[
        scoreHandle: BytesLike,
        scoreProof: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "getEncryptedAverage"): TypedContractMethod<[
    ], [
        [string, bigint] & {
            average: string;
            count: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "getEncryptedTotal"): TypedContractMethod<[
    ], [
        [string, bigint] & {
            total: string;
            count: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "getMyScore"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "hasSubmitted"): TypedContractMethod<[reviewer: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "manager"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "participantCount"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "protocolId"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "requestAverageAccess"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "requestMyScoreAccess"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "requestTotalAccess"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "submitScore"): TypedContractMethod<[
        scoreHandle: BytesLike,
        scoreProof: BytesLike
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "ScoreSubmitted"): TypedContractEvent<ScoreSubmittedEvent.InputTuple, ScoreSubmittedEvent.OutputTuple, ScoreSubmittedEvent.OutputObject>;
    filters: {
        "ScoreSubmitted(address,bool)": TypedContractEvent<ScoreSubmittedEvent.InputTuple, ScoreSubmittedEvent.OutputTuple, ScoreSubmittedEvent.OutputObject>;
        ScoreSubmitted: TypedContractEvent<ScoreSubmittedEvent.InputTuple, ScoreSubmittedEvent.OutputTuple, ScoreSubmittedEvent.OutputObject>;
    };
}
//# sourceMappingURL=EncryptedPeerReview.d.ts.map