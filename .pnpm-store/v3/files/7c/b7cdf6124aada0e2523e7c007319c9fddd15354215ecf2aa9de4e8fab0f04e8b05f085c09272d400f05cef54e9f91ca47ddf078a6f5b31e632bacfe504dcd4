/// <reference types="webpack-env" />
import { Parameters, LoaderFunction } from '@storybook/addons';
import { ClientApiParams, DecoratorFunction, StoryApi, ArgTypesEnhancer } from './types';
import StoryStore from './story_store';
export declare const addDecorator: (decorator: DecoratorFunction, deprecationWarning?: boolean) => void;
export declare const addParameters: (parameters: Parameters, deprecationWarning?: boolean) => void;
export declare const addLoader: (loader: LoaderFunction, deprecationWarning?: boolean) => void;
export declare const addArgTypesEnhancer: (enhancer: ArgTypesEnhancer) => void;
export default class ClientApi {
    private _storyStore;
    private _addons;
    private _decorateStory;
    private _noStoryModuleAddMethodHotDispose;
    constructor({ storyStore, decorateStory, noStoryModuleAddMethodHotDispose, }: ClientApiParams);
    setAddon: (addon: any) => void;
    addDecorator: (decorator: DecoratorFunction) => void;
    clearDecorators: () => void;
    addParameters: (parameters: Parameters) => void;
    addLoader: (loader: LoaderFunction) => void;
    addArgTypesEnhancer: (enhancer: ArgTypesEnhancer) => void;
    storiesOf: <StoryFnReturnType = unknown>(kind: string, m: NodeModule) => StoryApi<StoryFnReturnType>;
    getStorybook: () => import("./types").GetStorybookKind[];
    raw: () => import("./types").PublishedStoreItem[];
    store: () => StoryStore;
}
