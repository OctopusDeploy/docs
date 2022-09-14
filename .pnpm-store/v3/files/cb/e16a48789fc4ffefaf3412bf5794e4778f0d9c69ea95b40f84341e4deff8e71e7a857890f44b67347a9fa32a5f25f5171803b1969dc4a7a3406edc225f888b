import { StoryContext, StoryFn } from '@storybook/addons';
import { DecoratorFunction } from './types';
/**
 * When you call the story function inside a decorator, e.g.:
 *
 * ```jsx
 * <div>{storyFn({ foo: 'bar' })}</div>
 * ```
 *
 * This will override the `foo` property on the `innerContext`, which gets
 * merged in with the default context
 */
export declare const decorateStory: (storyFn: StoryFn, decorator: DecoratorFunction) => (context?: StoryContext) => unknown;
export declare const defaultDecorateStory: (storyFn: StoryFn, decorators: DecoratorFunction[]) => (context?: StoryContext) => unknown;
