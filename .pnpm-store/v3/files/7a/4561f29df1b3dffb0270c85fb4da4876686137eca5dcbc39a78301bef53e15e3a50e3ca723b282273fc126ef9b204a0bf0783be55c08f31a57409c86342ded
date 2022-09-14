import { ComponentType } from 'react';
import TextType from './Text';
import NumberType from './Number';
import ColorType from './Color';
import ObjectType from './Object';
import RadiosType from './Radio';
import ArrayType from './Array';
import DateType from './Date';
declare const KnobControls: {
    text: typeof TextType;
    number: typeof NumberType;
    color: typeof ColorType;
    boolean: import("react").FunctionComponent<import("./Boolean").BooleanTypeProps> & {
        serialize: (value: boolean) => string | null;
        deserialize: (value: string | null) => boolean;
    };
    object: typeof ObjectType;
    select: import("react").FunctionComponent<import("./Select").SelectTypeProps<import("./Select").SelectTypeKnobValue>> & {
        serialize: (value: import("./Select").SelectTypeKnobValue) => import("./Select").SelectTypeKnobValue;
        deserialize: (value: import("./Select").SelectTypeKnobValue) => import("./Select").SelectTypeKnobValue;
    };
    radios: typeof RadiosType;
    array: typeof ArrayType;
    date: typeof DateType;
    button: import("react").FunctionComponent<import("./Button").ButtonTypeProps> & {
        serialize: () => undefined;
        deserialize: () => undefined;
    };
    files: import("react").FunctionComponent<import("./Files").FilesTypeProps> & {
        serialize: () => undefined;
        deserialize: () => undefined;
    };
    options: import("react").FunctionComponent<import("./Options").OptionsTypeProps<any>> & {
        serialize: <T>(value: T) => T;
        deserialize: <T_1>(value: T_1) => T_1;
    };
};
export default KnobControls;
export declare type KnobType = keyof typeof KnobControls;
export declare type KnobControlType = ComponentType<any> & {
    serialize: (v: any) => any;
    deserialize: (v: any) => any;
};
export declare const getKnobControl: (type: KnobType) => KnobControlType;
export type { TextTypeKnob } from './Text';
export type { NumberTypeKnob, NumberTypeKnobOptions } from './Number';
export type { ColorTypeKnob } from './Color';
export type { BooleanTypeKnob } from './Boolean';
export type { ObjectTypeKnob } from './Object';
export type { SelectTypeKnob, SelectTypeOptionsProp, SelectTypeKnobValue } from './Select';
export type { RadiosTypeKnob, RadiosTypeOptionsProp, RadiosTypeKnobValue } from './Radio';
export type { ArrayTypeKnob, ArrayTypeKnobValue } from './Array';
export type { DateTypeKnob } from './Date';
export type { ButtonTypeKnob, ButtonTypeOnClickProp } from './Button';
export type { FileTypeKnob } from './Files';
export type { OptionsTypeKnob, OptionsKnobOptions, OptionsTypeOptionsProp, OptionsTypeKnobSingleValue, OptionsTypeKnobValue, } from './Options';
