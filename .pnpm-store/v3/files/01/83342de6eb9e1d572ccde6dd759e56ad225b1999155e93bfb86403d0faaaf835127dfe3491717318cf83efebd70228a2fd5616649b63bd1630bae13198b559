import React, { Component } from 'react';
import { KnobControlConfig, KnobControlProps } from './types';
declare type ColorTypeKnobValue = string;
export declare type ColorTypeKnob = KnobControlConfig<ColorTypeKnobValue>;
declare type ColorTypeProps = KnobControlProps<ColorTypeKnobValue>;
interface ColorTypeState {
    displayColorPicker: boolean;
}
export default class ColorType extends Component<ColorTypeProps, ColorTypeState> {
    static propTypes: {
        knob: React.Validator<KnobControlConfig<string>>;
        onChange: React.Validator<(value: string) => string>;
    };
    static defaultProps: ColorTypeProps;
    static serialize: (value: ColorTypeKnobValue) => string;
    static deserialize: (value: ColorTypeKnobValue) => string;
    state: ColorTypeState;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: ColorTypeProps, nextState: ColorTypeState): boolean;
    componentWillUnmount(): void;
    handleWindowMouseDown: (e: MouseEvent) => void;
    private handleClick;
    private handleChange;
    popover: HTMLDivElement;
    render(): JSX.Element;
}
export {};
