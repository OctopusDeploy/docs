import React, { Component } from 'react';
import { KnobControlConfig, KnobControlProps } from './types';
declare type DateTypeKnobValue = number;
export declare type DateTypeKnob = KnobControlConfig<DateTypeKnobValue>;
declare type DateTypeProps = KnobControlProps<DateTypeKnobValue>;
interface DateTypeState {
    valid: boolean | undefined;
}
export default class DateType extends Component<DateTypeProps, DateTypeState> {
    static defaultProps: DateTypeProps;
    static propTypes: {
        knob: React.Validator<KnobControlConfig<number>>;
        onChange: React.Validator<(value: number) => number>;
    };
    static serialize: (value: DateTypeKnobValue) => number;
    static deserialize: (value: DateTypeKnobValue) => number;
    static getDerivedStateFromProps(): {
        valid: boolean;
    };
    state: DateTypeState;
    componentDidUpdate(): void;
    private onDateChange;
    private onTimeChange;
    dateInput: HTMLInputElement;
    timeInput: HTMLInputElement;
    render(): JSX.Element | null;
}
export {};
