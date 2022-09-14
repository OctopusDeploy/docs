import React, { PureComponent } from 'react';
import { API } from '@storybook/api';
import { KnobStoreKnob } from '../KnobStore';
export declare const DEFAULT_GROUP_ID = "Other";
interface KnobPanelProps {
    active: boolean;
    onReset?: object;
    api: Pick<API, 'on' | 'off' | 'emit' | 'getQueryParam' | 'setQueryParams'>;
}
interface KnobPanelState {
    knobs: Record<string, KnobStoreKnob>;
}
interface KnobPanelOptions {
    timestamps?: boolean;
}
export default class KnobPanel extends PureComponent<KnobPanelProps> {
    static propTypes: {
        active: React.Validator<boolean>;
        onReset: React.Validator<object | undefined>;
        api: React.Validator<Pick<API, "on" | "off" | "emit" | "getQueryParam" | "setQueryParams">>;
    };
    static defaultProps: KnobPanelProps;
    state: KnobPanelState;
    options: KnobPanelOptions;
    lastEdit: number;
    loadedFromUrl: boolean;
    mounted: boolean;
    componentDidMount(): void;
    componentWillUnmount(): void;
    setOptions: (options?: KnobPanelOptions) => void;
    setKnobs: ({ knobs, timestamp, }: {
        knobs: Record<string, KnobStoreKnob>;
        timestamp?: number | undefined;
    }) => void;
    reset: () => void;
    copy: () => void;
    emitChange: (changedKnob: KnobStoreKnob) => void;
    handleChange: (changedKnob: KnobStoreKnob) => void;
    handleClick: (knob: KnobStoreKnob) => void;
    stopListeningOnStory: Function;
    render(): JSX.Element | null;
}
export {};
