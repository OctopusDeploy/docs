import React, { ChangeEvent, Component } from 'react';
import { KnobControlConfig, KnobControlProps } from './types';
export declare type ArrayTypeKnobValue = string[] | readonly string[];
export interface ArrayTypeKnob extends KnobControlConfig<ArrayTypeKnobValue> {
    separator: string;
}
interface ArrayTypeProps extends KnobControlProps<ArrayTypeKnobValue> {
    knob: ArrayTypeKnob;
}
export default class ArrayType extends Component<ArrayTypeProps> {
    static defaultProps: Partial<ArrayTypeProps>;
    static propTypes: {
        knob: React.Validator<ArrayTypeKnob>;
        onChange: React.Validator<(value: ArrayTypeKnobValue) => ArrayTypeKnobValue>;
    };
    static serialize: (value: ArrayTypeKnobValue) => ArrayTypeKnobValue;
    static deserialize: (value: string[] | Record<string, string>) => string[];
    shouldComponentUpdate(nextProps: Readonly<ArrayTypeProps>): boolean;
    handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    render(): JSX.Element;
}
export {};
