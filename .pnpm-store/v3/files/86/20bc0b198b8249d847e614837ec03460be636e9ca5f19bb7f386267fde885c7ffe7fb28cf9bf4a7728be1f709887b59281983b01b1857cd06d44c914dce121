import React, { Component } from 'react';
import { KnobControlConfig, KnobControlProps } from './types';
declare type CheckboxesTypeKnobValue = string[];
export interface CheckboxesTypeKnob extends KnobControlConfig<CheckboxesTypeKnobValue> {
    options: Record<string, string>;
}
interface CheckboxesTypeProps extends KnobControlProps<CheckboxesTypeKnobValue>, CheckboxesWrapperProps {
    knob: CheckboxesTypeKnob;
}
interface CheckboxesTypeState {
    values: CheckboxesTypeKnobValue;
}
interface CheckboxesWrapperProps {
    isInline: boolean;
}
export default class CheckboxesType extends Component<CheckboxesTypeProps, CheckboxesTypeState> {
    static defaultProps: CheckboxesTypeProps;
    static propTypes: {
        knob: React.Validator<CheckboxesTypeKnob>;
        onChange: React.Validator<(value: CheckboxesTypeKnobValue) => CheckboxesTypeKnobValue>;
        isInline: React.Validator<boolean>;
    };
    static serialize: (value: CheckboxesTypeKnobValue) => CheckboxesTypeKnobValue;
    static deserialize: (value: CheckboxesTypeKnobValue) => CheckboxesTypeKnobValue;
    constructor(props: CheckboxesTypeProps);
    private handleChange;
    private renderCheckboxList;
    private renderCheckbox;
    render(): JSX.Element;
}
export {};
