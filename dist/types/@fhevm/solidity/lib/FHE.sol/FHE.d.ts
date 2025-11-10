import type { BaseContract, BigNumberish, FunctionFragment, Interface, EventFragment, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener } from "../../../../common";
export interface FHEInterface extends Interface {
    getEvent(nameOrSignatureOrTopic: "DecryptionFulfilled"): EventFragment;
}
export declare namespace DecryptionFulfilledEvent {
    type InputTuple = [requestID: BigNumberish];
    type OutputTuple = [requestID: bigint];
    interface OutputObject {
        requestID: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface FHE extends BaseContract {
    connect(runner?: ContractRunner | null): FHE;
    waitForDeployment(): Promise<this>;
    interface: FHEInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getEvent(key: "DecryptionFulfilled"): TypedContractEvent<DecryptionFulfilledEvent.InputTuple, DecryptionFulfilledEvent.OutputTuple, DecryptionFulfilledEvent.OutputObject>;
    filters: {
        "DecryptionFulfilled(uint256)": TypedContractEvent<DecryptionFulfilledEvent.InputTuple, DecryptionFulfilledEvent.OutputTuple, DecryptionFulfilledEvent.OutputObject>;
        DecryptionFulfilled: TypedContractEvent<DecryptionFulfilledEvent.InputTuple, DecryptionFulfilledEvent.OutputTuple, DecryptionFulfilledEvent.OutputObject>;
    };
}
//# sourceMappingURL=FHE.d.ts.map