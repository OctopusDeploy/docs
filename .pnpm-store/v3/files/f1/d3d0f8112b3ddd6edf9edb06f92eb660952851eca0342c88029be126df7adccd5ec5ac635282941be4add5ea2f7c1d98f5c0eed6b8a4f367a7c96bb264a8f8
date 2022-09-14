import { Reducer, Action, Types } from './type-helpers';
declare type CreateReducerChainApi<TState, TPrevNotHandledAction extends Action, TRootAction extends Action> = <TType extends TPrevNotHandledAction['type'], TCreator extends (...args: any[]) => TPrevNotHandledAction, TNextNotHandledAction extends Exclude<TPrevNotHandledAction, Action<TType> & ReturnType<TCreator>>, TAction extends TPrevNotHandledAction extends Action<TType> ? TPrevNotHandledAction extends ReturnType<TCreator> ? TPrevNotHandledAction : never : never>(singleOrMultipleCreatorsAndTypes: TType | TType[] | TCreator | TCreator[], reducer: (state: TState, action: TAction) => TState) => [TNextNotHandledAction] extends [never] ? Reducer<TState, TRootAction> & {
    handlers: Record<TRootAction['type'], (state: TState, action: TRootAction) => TState>;
} : Reducer<TState, TRootAction> & {
    handlers: Record<Exclude<TRootAction, TNextNotHandledAction>['type'], (state: TState, action: TRootAction) => TState>;
    handleAction: CreateReducerChainApi<TState, TNextNotHandledAction, TRootAction>;
};
declare type GetAction<TAction extends Action, TType extends TAction['type']> = TAction extends Action<TType> ? TAction : never;
declare type InitialHandler<TState, TRootAction extends Action> = {
    [P in TRootAction['type']]?: (state: TState, action: GetAction<TRootAction, P>) => TState;
};
declare type RootAction = Types extends {
    RootAction: infer T;
} ? T : any;
export declare function createReducer<TState, TRootAction extends Action = RootAction>(initialState: TState, initialHandlers?: InitialHandler<TState, TRootAction>): Reducer<TState, TRootAction> & {
    readonly handlers: any;
    readonly handleAction: CreateReducerChainApi<TState, TRootAction, TRootAction>;
};
export {};
