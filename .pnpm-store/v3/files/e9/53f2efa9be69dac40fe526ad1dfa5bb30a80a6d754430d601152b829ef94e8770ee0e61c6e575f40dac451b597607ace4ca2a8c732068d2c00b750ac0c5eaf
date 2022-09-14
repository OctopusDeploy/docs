"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutPortal = exports.InPortal = exports.createSvgPortalNode = exports.createHtmlPortalNode = void 0;
const React = require("react");
const ReactDOM = require("react-dom");
// Internally, the portalNode must be for either HTML or SVG elements
const ELEMENT_TYPE_HTML = 'html';
const ELEMENT_TYPE_SVG = 'svg';
// ReactDOM can handle several different namespaces, but they're not exported publicly
// https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/packages/react-dom/src/shared/DOMNamespaces.js#L8-L10
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const validateElementType = (domElement, elementType) => {
    if (elementType === ELEMENT_TYPE_HTML) {
        return domElement instanceof HTMLElement;
    }
    if (elementType === ELEMENT_TYPE_SVG) {
        return domElement instanceof SVGElement;
    }
    throw new Error(`Unrecognized element type "${elementType}" for validateElementType.`);
};
// This is the internal implementation: the public entry points set elementType to an appropriate value
const createPortalNode = (elementType, options) => {
    let initialProps = {};
    let parent;
    let lastPlaceholder;
    let element;
    if (elementType === ELEMENT_TYPE_HTML) {
        element = document.createElement('div');
    }
    else if (elementType === ELEMENT_TYPE_SVG) {
        element = document.createElementNS(SVG_NAMESPACE, 'g');
    }
    else {
        throw new Error(`Invalid element type "${elementType}" for createPortalNode: must be "html" or "svg".`);
    }
    if (options && typeof options === "object") {
        for (const [key, value] of Object.entries(options.attributes)) {
            element.setAttribute(key, value);
        }
    }
    const portalNode = {
        element,
        elementType,
        setPortalProps: (props) => {
            initialProps = props;
        },
        getInitialPortalProps: () => {
            return initialProps;
        },
        mount: (newParent, newPlaceholder) => {
            if (newPlaceholder === lastPlaceholder) {
                // Already mounted - noop.
                return;
            }
            portalNode.unmount();
            // To support SVG and other non-html elements, the portalNode's elementType needs to match
            // the elementType it's being rendered into
            if (newParent !== parent) {
                if (!validateElementType(newParent, elementType)) {
                    throw new Error(`Invalid element type for portal: "${elementType}" portalNodes must be used with ${elementType} elements, but OutPortal is within <${newParent.tagName}>.`);
                }
            }
            newParent.replaceChild(portalNode.element, newPlaceholder);
            parent = newParent;
            lastPlaceholder = newPlaceholder;
        },
        unmount: (expectedPlaceholder) => {
            if (expectedPlaceholder && expectedPlaceholder !== lastPlaceholder) {
                // Skip unmounts for placeholders that aren't currently mounted
                // They will have been automatically unmounted already by a subsequent mount()
                return;
            }
            if (parent && lastPlaceholder) {
                parent.replaceChild(lastPlaceholder, portalNode.element);
                parent = undefined;
                lastPlaceholder = undefined;
            }
        }
    };
    return portalNode;
};
class InPortal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.addPropsChannel = () => {
            Object.assign(this.props.node, {
                setPortalProps: (props) => {
                    // Rerender the child node here if/when the out portal props change
                    this.setState({ nodeProps: props });
                }
            });
        };
        this.state = {
            nodeProps: this.props.node.getInitialPortalProps(),
        };
    }
    componentDidMount() {
        this.addPropsChannel();
    }
    componentDidUpdate() {
        this.addPropsChannel();
    }
    render() {
        const { children, node } = this.props;
        return ReactDOM.createPortal(React.Children.map(children, (child) => {
            if (!React.isValidElement(child))
                return child;
            return React.cloneElement(child, this.state.nodeProps);
        }), node.element);
    }
}
exports.InPortal = InPortal;
class OutPortal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.placeholderNode = React.createRef();
        this.passPropsThroughPortal();
    }
    passPropsThroughPortal() {
        const propsForTarget = Object.assign({}, this.props, { node: undefined });
        this.props.node.setPortalProps(propsForTarget);
    }
    componentDidMount() {
        const node = this.props.node;
        this.currentPortalNode = node;
        const placeholder = this.placeholderNode.current;
        const parent = placeholder.parentNode;
        node.mount(parent, placeholder);
        this.passPropsThroughPortal();
    }
    componentDidUpdate() {
        // We re-mount on update, just in case we were unmounted (e.g. by
        // a second OutPortal, which has now been removed)
        const node = this.props.node;
        // If we're switching portal nodes, we need to clean up the current one first.
        if (this.currentPortalNode && node !== this.currentPortalNode) {
            this.currentPortalNode.unmount(this.placeholderNode.current);
            this.currentPortalNode = node;
        }
        const placeholder = this.placeholderNode.current;
        const parent = placeholder.parentNode;
        node.mount(parent, placeholder);
        this.passPropsThroughPortal();
    }
    componentWillUnmount() {
        const node = this.props.node;
        node.unmount(this.placeholderNode.current);
    }
    render() {
        // Render a placeholder to the DOM, so we can get a reference into
        // our location in the DOM, and swap it out for the portaled node.
        // A <div> placeholder works fine even for SVG.
        return React.createElement("div", { ref: this.placeholderNode });
    }
}
exports.OutPortal = OutPortal;
const createHtmlPortalNode = createPortalNode.bind(null, ELEMENT_TYPE_HTML);
exports.createHtmlPortalNode = createHtmlPortalNode;
const createSvgPortalNode = createPortalNode.bind(null, ELEMENT_TYPE_SVG);
exports.createSvgPortalNode = createSvgPortalNode;
//# sourceMappingURL=index.js.map