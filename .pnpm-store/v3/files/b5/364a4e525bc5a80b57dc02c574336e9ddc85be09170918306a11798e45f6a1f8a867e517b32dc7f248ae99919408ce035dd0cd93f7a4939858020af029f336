import React, { Component } from 'react';
import { KnobStoreKnob } from '../KnobStore';
interface PropFormProps {
    knobs: KnobStoreKnob[];
    onFieldChange: (changedKnob: KnobStoreKnob) => void;
    onFieldClick: (knob: KnobStoreKnob) => void;
}
export default class PropForm extends Component<PropFormProps> {
    static displayName: string;
    static defaultProps: {
        knobs: KnobStoreKnob[];
        onFieldChange: () => void;
        onFieldClick: () => void;
    };
    static propTypes: {
        knobs: React.Validator<KnobStoreKnob[]>;
        onFieldChange: React.Validator<(changedKnob: KnobStoreKnob) => void>;
        onFieldClick: React.Validator<(knob: KnobStoreKnob) => void>;
    };
    makeChangeHandler(name: string, type: string): (value?: string) => void;
    render(): JSX.Element;
}
export {};
