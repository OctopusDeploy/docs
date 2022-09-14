import { TypeConstant, ActionBuilderConstructor } from './type-helpers';
export declare type AsyncActionCreator<TRequest extends [T1, P1], TSuccess extends [T2, P2], TFailure extends [T3, P3], TCancel extends [T4, P4] = never, T1 extends TypeConstant = TRequest[0], P1 = TRequest[1], T2 extends TypeConstant = TSuccess[0], P2 = TSuccess[1], T3 extends TypeConstant = TFailure[0], P3 = TFailure[1], T4 extends TypeConstant = TCancel[0], P4 = TCancel[1]> = {
    request: ActionBuilderConstructor<T1, P1>;
    success: ActionBuilderConstructor<T2, P2>;
    failure: ActionBuilderConstructor<T3, P3>;
    cancel: TCancel extends [TypeConstant, any] ? ActionBuilderConstructor<T4, P4> : never;
};
export interface AsyncActionBuilder<TType1 extends TypeConstant, TType2 extends TypeConstant, TType3 extends TypeConstant, TType4 extends TypeConstant> {
    <TPayload1, TPayload2, TPayload3, TPayload4>(): AsyncActionCreator<[TType1, TPayload1], [TType2, TPayload2], [TType3, TPayload3], [TType4, TPayload4]>;
    <TPayload1, TPayload2, TPayload3>(): AsyncActionCreator<[TType1, TPayload1], [TType2, TPayload2], [TType3, TPayload3]>;
}
/**
 * implementation
 */
export declare function createAsyncAction<TType1 extends TypeConstant, TType2 extends TypeConstant, TType3 extends TypeConstant, TType4 extends TypeConstant>(requestType: TType1, successType: TType2, failureType: TType3, cancelType?: TType4): AsyncActionBuilder<TType1, TType2, TType3, TType4>;
