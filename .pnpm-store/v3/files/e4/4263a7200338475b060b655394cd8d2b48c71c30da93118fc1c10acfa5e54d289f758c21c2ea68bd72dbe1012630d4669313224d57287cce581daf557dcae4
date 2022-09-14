import React, { Component, ChangeEvent } from 'react';
import { KnobControlConfig, KnobControlProps } from './types';
export declare type ObjectTypeKnob<T> = KnobControlConfig<T>;
declare type ObjectTypeProps<T> = KnobControlProps<T>;
interface ObjectTypeState<T> {
    value: string;
    failed: boolean;
    json?: T;
}
declare class ObjectType<T> extends Component<ObjectTypeProps<T>> {
    static propTypes: {
        knob: React.Validator<KnobControlConfig<any>>;
        onChange: React.Validator<(value: any) => any>;
    };
    static defaultProps: ObjectTypeProps<any>;
    static serialize: {
        <T>(object: T): string;
    };
    static deserialize: {
        <T>(value: string): T;
    };
    static getDerivedStateFromProps<T>(props: ObjectTypeProps<T>, state: ObjectTypeState<T>): ObjectTypeState<T> | null;
    state: ObjectTypeState<T>;
    handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    render(): JSX.Element;
}
export default ObjectType;
