import * as React from 'react';
declare const ELEMENT_TYPE_HTML = "html";
declare const ELEMENT_TYPE_SVG = "svg";
declare type Options = {
    attributes: {
        [key: string]: string;
    };
};
declare type Component<P> = React.Component<P> | React.ComponentType<P>;
declare type ComponentProps<C extends Component<any>> = C extends Component<infer P> ? P : never;
interface PortalNodeBase<C extends Component<any>> {
    setPortalProps(p: ComponentProps<C>): void;
    getInitialPortalProps(): ComponentProps<C>;
    mount(newParent: Node, placeholder: Node): void;
    unmount(expectedPlaceholder?: Node): void;
}
export interface HtmlPortalNode<C extends Component<any> = Component<any>> extends PortalNodeBase<C> {
    element: HTMLElement;
    elementType: typeof ELEMENT_TYPE_HTML;
}
export interface SvgPortalNode<C extends Component<any> = Component<any>> extends PortalNodeBase<C> {
    element: SVGElement;
    elementType: typeof ELEMENT_TYPE_SVG;
}
declare type AnyPortalNode<C extends Component<any> = Component<any>> = HtmlPortalNode<C> | SvgPortalNode<C>;
interface InPortalProps {
    node: AnyPortalNode;
    children: React.ReactNode;
}
declare class InPortal extends React.PureComponent<InPortalProps, {
    nodeProps: {};
}> {
    constructor(props: InPortalProps);
    addPropsChannel: () => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactPortal;
}
declare type OutPortalProps<C extends Component<any>> = {
    node: AnyPortalNode<C>;
} & Partial<ComponentProps<C>>;
declare class OutPortal<C extends Component<any>> extends React.PureComponent<OutPortalProps<C>> {
    private placeholderNode;
    private currentPortalNode?;
    constructor(props: OutPortalProps<C>);
    passPropsThroughPortal(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
declare const createHtmlPortalNode: <C extends Component<any> = Component<any>>(options?: Options | undefined) => HtmlPortalNode<C>;
declare const createSvgPortalNode: <C extends Component<any> = Component<any>>(options?: Options | undefined) => SvgPortalNode<C>;
export { createHtmlPortalNode, createSvgPortalNode, InPortal, OutPortal, };
