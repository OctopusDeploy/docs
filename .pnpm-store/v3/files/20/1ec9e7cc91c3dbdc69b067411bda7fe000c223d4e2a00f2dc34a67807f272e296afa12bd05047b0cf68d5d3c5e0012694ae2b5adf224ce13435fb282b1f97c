import React, { Component } from 'react';
import { KnobControlConfig, KnobControlProps } from './types';
export declare type RadiosTypeKnobValue = string | number | null | undefined;
export declare type RadiosTypeOptionsProp<T extends RadiosTypeKnobValue> = Record<string | number, T>;
export interface RadiosTypeKnob extends KnobControlConfig<RadiosTypeKnobValue> {
    options: RadiosTypeOptionsProp<RadiosTypeKnobValue>;
}
interface RadiosTypeProps extends KnobControlProps<RadiosTypeKnobValue>, RadiosWrapperProps {
    knob: RadiosTypeKnob;
}
interface RadiosWrapperProps {
    isInline: boolean;
}
declare class RadiosType extends Component<RadiosTypeProps> {
    static defaultProps: RadiosTypeProps;
    static propTypes: {
        knob: React.Validator<RadiosTypeKnob>;
        onChange: React.Validator<(value: string | number | null | undefined) => string | number | null | undefined>;
        isInline: React.Validator<boolean>;
    };
    static serialize: (value: RadiosTypeKnobValue) => string | number | null | undefined;
    static deserialize: (value: RadiosTypeKnobValue) => string | number | null | undefined;
    private renderRadioButtonList;
    private renderRadioButton;
    render(): JSX.Element;
}
export default RadiosType;
