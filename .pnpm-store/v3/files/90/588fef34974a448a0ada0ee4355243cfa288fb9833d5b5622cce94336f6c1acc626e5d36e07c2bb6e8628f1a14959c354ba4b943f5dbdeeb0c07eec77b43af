/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/* global window, document */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _subscribeUiEvent = require('subscribe-ui-event');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

// constants
var STATUS_ORIGINAL = 0; // The default status, locating at the original position.
var STATUS_RELEASED = 1; // The released status, locating at somewhere on document but not default one.
var STATUS_FIXED = 2; // The sticky status, locating fixed to the top or the bottom of screen.

var TRANSFORM_PROP = 'transform';

// global variable for all instances
var doc;
var docBody;
var docEl;
var canEnableTransforms = true; // Use transform by default, so no Sticky on lower-end browser when no Modernizr
var M;
var scrollDelta = 0;
var win;
var winHeight = -1;

var Sticky = (function (_Component) {
    _inherits(Sticky, _Component);

    function Sticky(props, context) {
        _classCallCheck(this, Sticky);

        _get(Object.getPrototypeOf(Sticky.prototype), 'constructor', this).call(this, props, context);
        this.handleResize = this.handleResize.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleScrollStart = this.handleScrollStart.bind(this);
        this.delta = 0;
        this.stickyTop = 0;
        this.stickyBottom = 0;
        this.frozen = false;
        this.skipNextScrollEvent = false;
        this.scrollTop = -1;

        this.bottomBoundaryTarget;
        this.topTarget;
        this.subscribers;

        this.state = {
            top: 0, // A top offset from viewport top where Sticky sticks to when scrolling up
            bottom: 0, // A bottom offset from viewport top where Sticky sticks to when scrolling down
            width: 0, // Sticky width
            height: 0, // Sticky height
            x: 0, // The original x of Sticky
            y: 0, // The original y of Sticky
            topBoundary: 0, // The top boundary on document
            bottomBoundary: Infinity, // The bottom boundary on document
            status: STATUS_ORIGINAL, // The Sticky status
            pos: 0, // Real y-axis offset for rendering position-fixed and position-relative
            activated: false // once browser info is available after mounted, it becomes true to avoid checksum error
        };
    }

    _createClass(Sticky, [{
        key: 'getTargetHeight',
        value: function getTargetHeight(target) {
            return target && target.offsetHeight || 0;
        }
    }, {
        key: 'getTopPosition',
        value: function getTopPosition(top) {
            // TODO, topTarget is for current layout, may remove
            // a top argument can be provided to override reading from the props
            top = top || this.props.top || this.props.topTarget || 0;
            if (typeof top === 'string') {
                if (!this.topTarget) {
                    this.topTarget = doc.querySelector(top);
                }
                top = this.getTargetHeight(this.topTarget);
            }
            return top;
        }
    }, {
        key: 'getTargetBottom',
        value: function getTargetBottom(target) {
            if (!target) {
                return -1;
            }
            var rect = target.getBoundingClientRect();
            return this.scrollTop + rect.bottom;
        }
    }, {
        key: 'getBottomBoundary',
        value: function getBottomBoundary(bottomBoundary) {
            // a bottomBoundary can be provided to avoid reading from the props
            var boundary = bottomBoundary || this.props.bottomBoundary;

            // TODO, bottomBoundary was an object, depricate it later.
            if (typeof boundary === 'object') {
                boundary = boundary.value || boundary.target || 0;
            }

            if (typeof boundary === 'string') {
                if (!this.bottomBoundaryTarget) {
                    this.bottomBoundaryTarget = doc.querySelector(boundary);
                }
                boundary = this.getTargetBottom(this.bottomBoundaryTarget);
            }
            return boundary && boundary > 0 ? boundary : Infinity;
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.setState({
                status: STATUS_ORIGINAL,
                pos: 0
            });
        }
    }, {
        key: 'release',
        value: function release(pos) {
            this.setState({
                status: STATUS_RELEASED,
                pos: pos - this.state.y
            });
        }
    }, {
        key: 'fix',
        value: function fix(pos) {
            this.setState({
                status: STATUS_FIXED,
                pos: pos
            });
        }

        /**
         * Update the initial position, width, and height. It should update whenever children change.
         * @param {Object} options optional top and bottomBoundary new values
         */
    }, {
        key: 'updateInitialDimension',
        value: function updateInitialDimension(options) {
            options = options || {};

            var outerRect = this.outerElement.getBoundingClientRect();
            var innerRect = this.innerElement.getBoundingClientRect();

            var width = outerRect.width || outerRect.right - outerRect.left;
            var height = innerRect.height || innerRect.bottom - innerRect.top;;
            var outerY = outerRect.top + this.scrollTop;

            this.setState({
                top: this.getTopPosition(options.top),
                bottom: Math.min(this.state.top + height, winHeight),
                width: width,
                height: height,
                x: outerRect.left,
                y: outerY,
                bottomBoundary: this.getBottomBoundary(options.bottomBoundary),
                topBoundary: outerY
            });
        }
    }, {
        key: 'handleResize',
        value: function handleResize(e, ae) {
            if (this.props.shouldFreeze()) {
                return;
            }

            winHeight = ae.resize.height;
            this.updateInitialDimension();
            this.update();
        }
    }, {
        key: 'handleScrollStart',
        value: function handleScrollStart(e, ae) {
            this.frozen = this.props.shouldFreeze();

            if (this.frozen) {
                return;
            }

            if (this.scrollTop === ae.scroll.top) {
                // Scroll position hasn't changed,
                // do nothing
                this.skipNextScrollEvent = true;
            } else {
                this.scrollTop = ae.scroll.top;
                this.updateInitialDimension();
            }
        }
    }, {
        key: 'handleScroll',
        value: function handleScroll(e, ae) {
            // Scroll doesn't need to be handled
            if (this.skipNextScrollEvent) {
                this.skipNextScrollEvent = false;
                return;
            }

            scrollDelta = ae.scroll.delta;
            this.scrollTop = ae.scroll.top;
            this.update();
        }

        /**
         * Update Sticky position.
         */
    }, {
        key: 'update',
        value: function update() {
            var disabled = !this.props.enabled || this.state.bottomBoundary - this.state.topBoundary <= this.state.height || this.state.width === 0 && this.state.height === 0;

            if (disabled) {
                if (this.state.status !== STATUS_ORIGINAL) {
                    this.reset();
                }
                return;
            }

            var delta = scrollDelta;
            // "top" and "bottom" are the positions that this.state.top and this.state.bottom project
            // on document from viewport.
            var top = this.scrollTop + this.state.top;
            var bottom = this.scrollTop + this.state.bottom;

            // There are 2 principles to make sure Sticky won't get wrong so much:
            // 1. Reset Sticky to the original postion when "top" <= topBoundary
            // 2. Release Sticky to the bottom boundary when "bottom" >= bottomBoundary
            if (top <= this.state.topBoundary) {
                // #1
                this.reset();
            } else if (bottom >= this.state.bottomBoundary) {
                // #2
                this.stickyBottom = this.state.bottomBoundary;
                this.stickyTop = this.stickyBottom - this.state.height;
                this.release(this.stickyTop);
            } else {
                if (this.state.height > winHeight - this.state.top) {
                    // In this case, Sticky is higher then viewport minus top offset
                    switch (this.state.status) {
                        case STATUS_ORIGINAL:
                            this.release(this.state.y);
                            this.stickyTop = this.state.y;
                            this.stickyBottom = this.stickyTop + this.state.height;
                        // Commentting out "break" is on purpose, because there is a chance to transit to FIXED
                        // from ORIGINAL when calling window.scrollTo().
                        // break;
                        case STATUS_RELEASED:
                            // If "top" and "bottom" are inbetween stickyTop and stickyBottom, then Sticky is in
                            // RELEASE status. Otherwise, it changes to FIXED status, and its bottom sticks to
                            // viewport bottom when scrolling down, or its top sticks to viewport top when scrolling up.
                            this.stickyBottom = this.stickyTop + this.state.height;
                            if (delta > 0 && bottom > this.stickyBottom) {
                                this.fix(this.state.bottom - this.state.height);
                            } else if (delta < 0 && top < this.stickyTop) {
                                this.fix(this.state.top);
                            }
                            break;
                        case STATUS_FIXED:
                            var toRelease = true;
                            var pos = this.state.pos;
                            var height = this.state.height;
                            // In regular cases, when Sticky is in FIXED status,
                            // 1. it's top will stick to the screen top,
                            // 2. it's bottom will stick to the screen bottom,
                            // 3. if not the cases above, then it's height gets changed
                            if (delta > 0 && pos === this.state.top) {
                                // case 1, and scrolling down
                                this.stickyTop = top - delta;
                                this.stickyBottom = this.stickyTop + height;
                            } else if (delta < 0 && pos === this.state.bottom - height) {
                                // case 2, and scrolling up
                                this.stickyBottom = bottom - delta;
                                this.stickyTop = this.stickyBottom - height;
                            } else if (pos !== this.state.bottom - height && pos !== this.state.top) {
                                // case 3
                                // This case only happens when Sticky's bottom sticks to the screen bottom and
                                // its height gets changed. Sticky should be in RELEASE status and update its
                                // sticky bottom by calculating how much height it changed.
                                var deltaHeight = pos + height - this.state.bottom;
                                this.stickyBottom = bottom - delta + deltaHeight;
                                this.stickyTop = this.stickyBottom - height;
                            } else {
                                toRelease = false;
                            }

                            if (toRelease) {
                                this.release(this.stickyTop);
                            }
                            break;
                    }
                } else {
                    // In this case, Sticky is shorter then viewport minus top offset
                    // and will always fix to the top offset of viewport
                    this.fix(this.state.top);
                }
            }
            this.delta = delta;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.updateInitialDimension(nextProps);
            this.update();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var _this = this;

            if (prevState.status !== this.state.status && this.props.onStateChange) {
                this.props.onStateChange({ status: this.state.status });
            }
            // if the props for enabling are toggled, then trigger the update or reset depending on the current props
            if (prevProps.enabled !== this.props.enabled) {
                if (this.props.enabled) {
                    this.setState({ activated: true }, function () {
                        _this.updateInitialDimension();
                        _this.update();
                    });
                } else {
                    this.setState({ activated: false }, function () {
                        _this.reset();
                    });
                }
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var subscribers = this.subscribers || [];
            for (var i = subscribers.length - 1; i >= 0; i--) {
                this.subscribers[i].unsubscribe();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            // Only initialize the globals if this is the first
            // time this component type has been mounted
            if (!win) {
                win = window;
                doc = document;
                docEl = doc.documentElement;
                docBody = doc.body;
                winHeight = win.innerHeight || docEl.clientHeight;
                M = window.Modernizr;
                // No Sticky on lower-end browser when no Modernizr
                if (M && M.prefixed) {
                    canEnableTransforms = M.csstransforms3d;
                    TRANSFORM_PROP = M.prefixed('transform');
                }
            }

            // when mount, the scrollTop is not necessary on the top
            this.scrollTop = docBody.scrollTop + docEl.scrollTop;

            if (this.props.enabled) {
                this.setState({ activated: true });
                this.updateInitialDimension();
                this.update();
            }
            // bind the listeners regardless if initially enabled - allows the component to toggle sticky functionality
            this.subscribers = [(0, _subscribeUiEvent.subscribe)('scrollStart', this.handleScrollStart.bind(this), { useRAF: true }), (0, _subscribeUiEvent.subscribe)('scroll', this.handleScroll.bind(this), { useRAF: true, enableScrollInfo: true }), (0, _subscribeUiEvent.subscribe)('resize', this.handleResize.bind(this), { enableResizeInfo: true })];
        }
    }, {
        key: 'translate',
        value: function translate(style, pos) {
            var enableTransforms = canEnableTransforms && this.props.enableTransforms;
            if (enableTransforms && this.state.activated) {
                style[TRANSFORM_PROP] = 'translate3d(0,' + Math.round(pos) + 'px,0)';
            } else {
                style.top = pos + 'px';
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return !this.props.shouldFreeze() && (0, _reactAddonsShallowCompare2['default'])(this, nextProps, nextState);
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames,
                _this2 = this;

            // TODO, "overflow: auto" prevents collapse, need a good way to get children height
            var innerStyle = {
                position: this.state.status === STATUS_FIXED ? 'fixed' : 'relative',
                top: this.state.status === STATUS_FIXED ? '0px' : '',
                zIndex: this.props.innerZ
            };
            var outerStyle = {};

            // always use translate3d to enhance the performance
            this.translate(innerStyle, this.state.pos);
            if (this.state.status !== STATUS_ORIGINAL) {
                innerStyle.width = this.state.width + 'px';
                outerStyle.height = this.state.height + 'px';
            }

            var outerClasses = (0, _classnames2['default'])('sticky-outer-wrapper', this.props.className, (_classNames = {}, _defineProperty(_classNames, this.props.activeClass, this.state.status === STATUS_FIXED), _defineProperty(_classNames, this.props.releasedClass, this.state.status === STATUS_RELEASED), _classNames));

            var children = this.props.children;

            return _react2['default'].createElement(
                'div',
                { ref: function (outer) {
                        _this2.outerElement = outer;
                    }, className: outerClasses, style: outerStyle },
                _react2['default'].createElement(
                    'div',
                    { ref: function (inner) {
                            _this2.innerElement = inner;
                        }, className: 'sticky-inner-wrapper', style: innerStyle },
                    typeof children === 'function' ? children({ status: this.state.status }) : children
                )
            );
        }
    }]);

    return Sticky;
})(_react.Component);

Sticky.displayName = 'Sticky';

Sticky.defaultProps = {
    shouldFreeze: function shouldFreeze() {
        return false;
    },
    enabled: true,
    top: 0,
    bottomBoundary: 0,
    enableTransforms: true,
    activeClass: 'active',
    releasedClass: 'released',
    onStateChange: null
};

/**
 * @param {Bool} enabled A switch to enable or disable Sticky.
 * @param {String/Number} top A top offset px for Sticky. Could be a selector representing a node
 *        whose height should serve as the top offset.
 * @param {String/Number} bottomBoundary A bottom boundary px on document where Sticky will stop.
 *        Could be a selector representing a node whose bottom should serve as the bottom boudary.
 */
Sticky.propTypes = {
    enabled: _propTypes2['default'].bool,
    top: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    bottomBoundary: _propTypes2['default'].oneOfType([_propTypes2['default'].object, // TODO, may remove
    _propTypes2['default'].string, _propTypes2['default'].number]),
    enableTransforms: _propTypes2['default'].bool,
    activeClass: _propTypes2['default'].string,
    releasedClass: _propTypes2['default'].string,
    onStateChange: _propTypes2['default'].func,
    shouldFreeze: _propTypes2['default'].func,
    innerZ: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number])
};

Sticky.STATUS_ORIGINAL = STATUS_ORIGINAL;
Sticky.STATUS_RELEASED = STATUS_RELEASED;
Sticky.STATUS_FIXED = STATUS_FIXED;

module.exports = Sticky;
