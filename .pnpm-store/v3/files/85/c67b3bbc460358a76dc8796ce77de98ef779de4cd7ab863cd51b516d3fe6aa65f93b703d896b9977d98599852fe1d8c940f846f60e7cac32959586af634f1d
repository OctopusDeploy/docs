import React, { Component } from 'react';
import { KnobControlConfig, KnobControlProps } from './types';
declare type NumberTypeKnobValue = number;
export interface NumberTypeKnobOptions {
    range?: boolean;
    min?: number;
    max?: number;
    step?: number;
}
export declare type NumberTypeKnob = KnobControlConfig<NumberTypeKnobValue> & NumberTypeKnobOptions & {
    value?: NumberTypeKnobValue;
};
interface NumberTypeProps extends KnobControlProps<NumberTypeKnobValue | null> {
    knob: NumberTypeKnob;
}
export default class NumberType extends Component<NumberTypeProps> {
    static propTypes: {
        knob: React.Validator<NumberTypeKnob>;
        onChange: React.Validator<(value: number | null) => number | null>;
    };
    static defaultProps: NumberTypeProps;
    static serialize: (value: NumberTypeKnobValue | null | undefined) => string;
    static deserialize: (value: string) => number | null;
    shouldComponentUpdate(nextProps: NumberTypeProps): boolean;
    private handleChange;
    render(): JSX.Element;
}
export {};
