var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// Internally, the portalNode must be for either HTML or SVG elements
var ELEMENT_TYPE_HTML = 'html';
var ELEMENT_TYPE_SVG = 'svg';
// ReactDOM can handle several different namespaces, but they're not exported publicly
// https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/packages/react-dom/src/shared/DOMNamespaces.js#L8-L10
var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
var validateElementType = function (domElement, elementType) {
    if (elementType === ELEMENT_TYPE_HTML) {
        return domElement instanceof HTMLElement;
    }
    if (elementType === ELEMENT_TYPE_SVG) {
        return domElement instanceof SVGElement;
    }
    throw new Error("Unrecognized element type \"" + elementType + "\" for validateElementType.");
};
// This is the internal implementation: the public entry points set elementType to an appropriate value
var createPortalNode = function (elementType, options) {
    var initialProps = {};
    var parent;
    var lastPlaceholder;
    var element;
    if (elementType === ELEMENT_TYPE_HTML) {
        element = document.createElement('div');
    }
    else if (elementType === ELEMENT_TYPE_SVG) {
        element = document.createElementNS(SVG_NAMESPACE, 'g');
    }
    else {
        throw new Error("Invalid element type \"" + elementType + "\" for createPortalNode: must be \"html\" or \"svg\".");
    }
    if (options && typeof options === "object") {
        for (var _i = 0, _a = Object.entries(options.attributes); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            element.setAttribute(key, value);
        }
    }
    var portalNode = {
        element: element,
        elementType: elementType,
        setPortalProps: function (props) {
            initialProps = props;
        },
        getInitialPortalProps: function () {
            return initialProps;
        },
        mount: function (newParent, newPlaceholder) {
            if (newPlaceholder === lastPlaceholder) {
                // Already mounted - noop.
                return;
            }
            portalNode.unmount();
            // To support SVG and other non-html elements, the portalNode's elementType needs to match
            // the elementType it's being rendered into
            if (newParent !== parent) {
                if (!validateElementType(newParent, elementType)) {
                    throw new Error("Invalid element type for portal: \"" + elementType + "\" portalNodes must be used with " + elementType + " elements, but OutPortal is within <" + newParent.tagName + ">.");
                }
            }
            newParent.replaceChild(portalNode.element, newPlaceholder);
            parent = newParent;
            lastPlaceholder = newPlaceholder;
        },
        unmount: function (expectedPlaceholder) {
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
var InPortal = /** @class */ (function (_super) {
    __extends(InPortal, _super);
    function InPortal(props) {
        var _this = _super.call(this, props) || this;
        _this.addPropsChannel = function () {
            Object.assign(_this.props.node, {
                setPortalProps: function (props) {
                    // Rerender the child node here if/when the out portal props change
                    _this.setState({ nodeProps: props });
                }
            });
        };
        _this.state = {
            nodeProps: _this.props.node.getInitialPortalProps(),
        };
        return _this;
    }
    InPortal.prototype.componentDidMount = function () {
        this.addPropsChannel();
    };
    InPortal.prototype.componentDidUpdate = function () {
        this.addPropsChannel();
    };
    InPortal.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, node = _a.node;
        return ReactDOM.createPortal(React.Children.map(children, function (child) {
            if (!React.isValidElement(child))
                return child;
            return React.cloneElement(child, _this.state.nodeProps);
        }), node.element);
    };
    return InPortal;
}(React.PureComponent));
var OutPortal = /** @class */ (function (_super) {
    __extends(OutPortal, _super);
    function OutPortal(props) {
        var _this = _super.call(this, props) || this;
        _this.placeholderNode = React.createRef();
        _this.passPropsThroughPortal();
        return _this;
    }
    OutPortal.prototype.passPropsThroughPortal = function () {
        var propsForTarget = Object.assign({}, this.props, { node: undefined });
        this.props.node.setPortalProps(propsForTarget);
    };
    OutPortal.prototype.componentDidMount = function () {
        var node = this.props.node;
        this.currentPortalNode = node;
        var placeholder = this.placeholderNode.current;
        var parent = placeholder.parentNode;
        node.mount(parent, placeholder);
        this.passPropsThroughPortal();
    };
    OutPortal.prototype.componentDidUpdate = function () {
        // We re-mount on update, just in case we were unmounted (e.g. by
        // a second OutPortal, which has now been removed)
        var node = this.props.node;
        // If we're switching portal nodes, we need to clean up the current one first.
        if (this.currentPortalNode && node !== this.currentPortalNode) {
            this.currentPortalNode.unmount(this.placeholderNode.current);
            this.currentPortalNode = node;
        }
        var placeholder = this.placeholderNode.current;
        var parent = placeholder.parentNode;
        node.mount(parent, placeholder);
        this.passPropsThroughPortal();
    };
    OutPortal.prototype.componentWillUnmount = function () {
        var node = this.props.node;
        node.unmount(this.placeholderNode.current);
    };
    OutPortal.prototype.render = function () {
        // Render a placeholder to the DOM, so we can get a reference into
        // our location in the DOM, and swap it out for the portaled node.
        // A <div> placeholder works fine even for SVG.
        return React.createElement("div", { ref: this.placeholderNode });
    };
    return OutPortal;
}(React.PureComponent));
var createHtmlPortalNode = createPortalNode.bind(null, ELEMENT_TYPE_HTML);
var createSvgPortalNode = createPortalNode.bind(null, ELEMENT_TYPE_SVG);
export { createHtmlPortalNode, createSvgPortalNode, InPortal, OutPortal, };
//# sourceMappingURL=index.js.map