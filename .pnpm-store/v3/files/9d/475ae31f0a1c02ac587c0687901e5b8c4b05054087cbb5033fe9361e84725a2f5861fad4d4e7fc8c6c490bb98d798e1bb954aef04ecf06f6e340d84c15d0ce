import { FunctionComponent } from 'react';
import { KnobControlConfig, KnobControlProps } from './types';
export declare type SelectTypeKnobValue = string | number | boolean | null | undefined | PropertyKey[];
export declare type SelectTypeOptionsProp<T extends SelectTypeKnobValue = SelectTypeKnobValue> = Record<PropertyKey, T> | Record<Extract<T, PropertyKey>, T[keyof T]> | T[] | readonly T[];
export interface SelectTypeKnob<T extends SelectTypeKnobValue = SelectTypeKnobValue> extends KnobControlConfig<T> {
    options: SelectTypeOptionsProp<T>;
}
export interface SelectTypeProps<T extends SelectTypeKnobValue = SelectTypeKnobValue> extends KnobControlProps<T> {
    knob: SelectTypeKnob<T>;
}
declare const serialize: (value: SelectTypeKnobValue) => SelectTypeKnobValue;
declare const deserialize: (value: SelectTypeKnobValue) => SelectTypeKnobValue;
declare const SelectType: FunctionComponent<SelectTypeProps> & {
    serialize: typeof serialize;
    deserialize: typeof deserialize;
};
export default SelectType;
