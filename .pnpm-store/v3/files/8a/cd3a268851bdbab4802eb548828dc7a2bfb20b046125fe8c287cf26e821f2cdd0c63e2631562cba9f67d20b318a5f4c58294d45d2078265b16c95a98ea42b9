'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VerticleButton = exports.CircleArrow = exports.TinyButton = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tweenFunctions = require('tween-functions');

var _tweenFunctions2 = _interopRequireDefault(_tweenFunctions);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _detectPassiveEvents = require('detect-passive-events');

var _detectPassiveEvents2 = _interopRequireDefault(_detectPassiveEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollUpButton = function (_React$Component) {
  _inherits(ScrollUpButton, _React$Component);

  function ScrollUpButton(props) {
    _classCallCheck(this, ScrollUpButton);

    var _this = _possibleConstructorReturn(this, (ScrollUpButton.__proto__ || Object.getPrototypeOf(ScrollUpButton)).call(this, props));

    _this.state = { ToggleScrollUp: '' };
    _this.Animation = {
      StartPosition: 0,
      CurrentAnimationTime: 0,
      StartTime: null,
      AnimationFrame: null
    };
    _this.HandleScroll = _this.HandleScroll.bind(_this);
    _this.StopScrollingFrame = _this.StopScrollingFrame.bind(_this);
    _this.ScrollingFrame = _this.ScrollingFrame.bind(_this);
    _this.HandleClick = _this.HandleClick.bind(_this);
    return _this;
  }

  _createClass(ScrollUpButton, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.HandleScroll(); // run HandleScroll() at mount incase we are already scrolled down
      window.addEventListener('scroll', this.HandleScroll);
      window.addEventListener('wheel', this.StopScrollingFrame, _detectPassiveEvents2.default.hasSupport ? { passive: true } : false); // Stop animation if user mouse wheels during animation.
      window.addEventListener('touchstart', this.StopScrollingFrame, _detectPassiveEvents2.default.hasSupport ? { passive: true } : false); // Stop animation if user touches the screen during animation.
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // Remove all events, since component is no longer mounted.
      window.removeEventListener('scroll', this.HandleScroll);
      window.removeEventListener('wheel', this.StopScrollingFrame, false);
      window.removeEventListener('touchstart', this.StopScrollingFrame, false);
    }
  }, {
    key: 'HandleScroll',
    value: function HandleScroll() {
      var _props = this.props,
          ShowAtPosition = _props.ShowAtPosition,
          TransitionClassName = _props.TransitionClassName;
      // window.pageYOffset = current scroll position
      // ShowAtPosition = position at which we want the button to show.

      if (window.pageYOffset > ShowAtPosition) {
        // styles.Toggled = the class name we want applied to transition the button in.
        this.setState({ ToggleScrollUp: TransitionClassName });
      } else {
        // remove the class name
        this.setState({ ToggleScrollUp: '' });
      }
    }
  }, {
    key: 'HandleClick',
    value: function HandleClick() {
      // Is this needed?
      // const { ShowAtPosition } = this.props
      // // For some reason the user was able to click the button.
      // if (window.pageYOffset < ShowAtPosition) {
      //   event.preventDefault()
      //   this.HandleScroll()
      // }
      // Scroll to StopPosition
      this.StopScrollingFrame(); // Stoping all AnimationFrames
      this.Animation.StartPosition = window.pageYOffset; // current scroll position
      this.Animation.CurrentAnimationTime = 0;
      this.Animation.StartTime = null;
      // Start the scrolling animation.
      this.Animation.AnimationFrame = window.requestAnimationFrame(this.ScrollingFrame);
    }
  }, {
    key: 'ScrollingFrame',
    value: function ScrollingFrame() {
      var _props2 = this.props,
          StopPosition = _props2.StopPosition,
          EasingType = _props2.EasingType,
          AnimationDuration = _props2.AnimationDuration;

      var timestamp = Math.floor(Date.now());
      // If StartTime has not been assigned a value, assign it the start timestamp.
      if (!this.Animation.StartTime) {
        this.Animation.StartTime = timestamp;
      }

      // set CurrentAnimationTime every iteration of ScrollingFrame()
      this.Animation.CurrentAnimationTime = timestamp - this.Animation.StartTime;
      // if we hit the StopPosition, StopScrollingFrame()
      if (window.pageYOffset <= StopPosition) {
        this.StopScrollingFrame();
      } else {
        // Otherwise continue ScrollingFrame to the StopPosition.
        // Does not support horizontal ScrollingFrame.
        // Let TweenFunctions handle the math to give us a new position based on AnimationDuration and EasingType type
        var YPos = _tweenFunctions2.default[EasingType](this.Animation.CurrentAnimationTime, this.Animation.StartPosition, StopPosition, AnimationDuration);
        if (YPos <= StopPosition) {
          YPos = StopPosition;
        }
        window.scrollTo(0, YPos);
        // Request another frame to be painted
        this.Animation.AnimationFrame = window.requestAnimationFrame(this.ScrollingFrame);
      }
    }
  }, {
    key: 'StopScrollingFrame',
    value: function StopScrollingFrame() {
      // Stop the Animation Frames.
      window.cancelAnimationFrame(this.Animation.AnimationFrame);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = {
        MainStyle: {
          backgroundColor: 'rgba(50, 50, 50, 0.5)',
          height: 50,
          position: 'fixed',
          bottom: 20,
          width: 50,
          WebkitTransition: 'all 0.5s ease-in-out',
          transition: 'all 0.5s ease-in-out',
          transitionProperty: 'opacity, right',
          cursor: 'pointer',
          opacity: 0,
          right: -50,
          zIndex: 1000
        },
        SvgStyle: {
          display: 'inline-block',
          width: '100%',
          height: '100%',
          strokeWidth: 0,
          stroke: 'white',
          fill: 'white'
        },
        ToggledStyle: {
          opacity: 1,
          right: 20
        }
      };
      var _props3 = this.props,
          children = _props3.children,
          style = _props3.style,
          ToggledStyle = _props3.ToggledStyle,
          ContainerClassName = _props3.ContainerClassName;
      var ToggleScrollUp = this.state.ToggleScrollUp;

      if (children) {
        var childrenWithProps = _react2.default.Children.map(children, function (child) {
          return _react2.default.cloneElement(child, {
            className: _this2.className
          });
        });
        return _react2.default.createElement(
          'aside',
          {
            role: 'button',
            'aria-label': 'Scroll to top of page',
            tabIndex: ToggleScrollUp ? 0 : -1,
            'data-testid': 'react-scroll-up-button',
            style: _extends({}, style, ToggleScrollUp && ToggledStyle),
            className: ContainerClassName + ' ' + ToggleScrollUp,
            onClick: this.HandleClick,
            onKeyPress: this.HandleClick
          },
          childrenWithProps
        );
      }
      return _react2.default.createElement(
        'aside',
        {
          role: 'button',
          'aria-label': 'Scroll to top of page',
          tabIndex: ToggleScrollUp ? 0 : -1,
          'data-testid': 'react-scroll-up-button',
          className: ContainerClassName + ' ' + ToggleScrollUp,
          style: _extends({}, styles.MainStyle, style, ToggleScrollUp && styles.ToggledStyle, ToggleScrollUp && ToggledStyle),
          onClick: this.HandleClick,
          onKeyPress: this.HandleClick
        },
        _react2.default.createElement(
          'svg',
          {
            viewBox: '0 0 32 32',
            version: '1.1',
            xmlns: 'http://www.w3.org/2000/svg',
            x: '0',
            y: '0',
            xmlSpace: 'preserve',
            style: styles.SvgStyle
          },
          _react2.default.createElement('path', {
            transform: 'scale(1.4) translate(1,-5)',
            d: 'M19.196 23.429q0 0.232-0.179 0.411l-0.893 0.893q-0.179 0.179-0.411 0.179t-0.411-0.179l-7.018-7.018-7.018 7.018q-0.179 0.179-0.411 0.179t-0.411-0.179l-0.893-0.893q-0.179-0.179-0.179-0.411t0.179-0.411l8.321-8.321q0.179-0.179 0.411-0.179t0.411 0.179l8.321 8.321q0.179 0.179 0.179 0.411zM19.196 16.571q0 0.232-0.179 0.411l-0.893 0.893q-0.179 0.179-0.411 0.179t-0.411-0.179l-7.018-7.018-7.018 7.018q-0.179 0.179-0.411 0.179t-0.411-0.179l-0.893-0.893q-0.179-0.179-0.179-0.411t0.179-0.411l8.321-8.321q0.179-0.179 0.411-0.179t0.411 0.179l8.321 8.321q0.179 0.179 0.179 0.411z' // eslint-disable-line
          })
        )
      );
    }
  }]);

  return ScrollUpButton;
}(_react2.default.Component);

exports.default = ScrollUpButton;
var TinyButton = exports.TinyButton = function TinyButton(props) {
  var styles = {
    MainStyle: {
      backgroundColor: 'rgb(87, 86, 86)',
      height: 30,
      position: 'fixed',
      bottom: 20,
      width: 30,
      WebkitTransition: 'all 0.5s ease-in-out',
      transition: 'all 0.5s ease-in-out',
      transitionProperty: 'opacity, right',
      cursor: 'pointer',
      opacity: 0,
      right: -75,
      zIndex: 1000,
      fill: '#292929',
      paddingBottom: 1,
      paddingLeft: 1,
      paddingRight: 1
    },
    ToggledStyle: {
      opacity: 1,
      right: 30
    }
  };
  var style = props.style,
      ToggledStyle = props.ToggledStyle;

  return _react2.default.createElement(
    ScrollUpButton,
    _extends({}, props, {
      style: _extends({}, styles.MainStyle, style),
      ToggledStyle: _extends({}, styles.ToggledStyle, ToggledStyle)
    }),
    _react2.default.createElement(
      'svg',
      {
        viewBox: '0 0 28 28',
        version: '1.1',
        xmlns: 'http://www.w3.org/2000/svg',
        x: '0',
        y: '0',
        xmlSpace: 'preserve'
      },
      _react2.default.createElement('path', {
        d: 'M26.297 20.797l-2.594 2.578c-0.391 0.391-1.016 0.391-1.406 0l-8.297-8.297-8.297 8.297c-0.391 0.391-1.016 0.391-1.406 0l-2.594-2.578c-0.391-0.391-0.391-1.031 0-1.422l11.594-11.578c0.391-0.391 1.016-0.391 1.406 0l11.594 11.578c0.391 0.391 0.391 1.031 0 1.422z' // eslint-disable-line
      })
    )
  );
};

var CircleArrow = exports.CircleArrow = function CircleArrow(props) {
  var styles = {
    MainStyle: {
      backgroundColor: 'rgb(255, 255, 255)',
      borderRadius: '50%',
      border: '5px solid black',
      height: 50,
      position: 'fixed',
      bottom: 20,
      width: 50,
      WebkitTransition: 'all 0.5s ease-in-out',
      transition: 'all 0.5s ease-in-out',
      transitionProperty: 'opacity, right',
      cursor: 'pointer',
      opacity: 0,
      right: -75
    },
    ToggledStyle: {
      opacity: 1,
      right: 20
    }
  };
  var style = props.style,
      ToggledStyle = props.ToggledStyle;

  return _react2.default.createElement(
    ScrollUpButton,
    _extends({}, props, {
      style: _extends({}, styles.MainStyle, style),
      ToggledStyle: _extends({}, styles.ToggledStyle, ToggledStyle)
    }),
    _react2.default.createElement(
      'svg',
      { viewBox: '0 0 32 32' },
      _react2.default.createElement('path', {
        d: 'M27.414 12.586l-10-10c-0.781-0.781-2.047-0.781-2.828 0l-10 10c-0.781 0.781-0.781 2.047 0 2.828s2.047 0.781 2.828 0l6.586-6.586v19.172c0 1.105 0.895 2 2 2s2-0.895 2-2v-19.172l6.586 6.586c0.39 0.39 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586c0.781-0.781 0.781-2.047 0-2.828z' // eslint-disable-line
      })
    )
  );
};

var VerticleButton = exports.VerticleButton = function VerticleButton(props) {
  var styles = {
    MainStyle: {
      backgroundColor: 'rgb(58, 56, 56)',
      position: 'fixed',
      bottom: 40,
      padding: '5px 10px',
      WebkitTransition: 'all 0.5s ease-in-out',
      transition: 'all 0.5s ease-in-out',
      transitionProperty: 'opacity, right',
      cursor: 'pointer',
      opacity: 0,
      right: -75,
      transform: 'rotate(-90deg)'
    },
    ToggledStyle: {
      opacity: 1,
      right: 10
    }
  };
  var style = props.style,
      ToggledStyle = props.ToggledStyle;

  return _react2.default.createElement(
    ScrollUpButton,
    _extends({}, props, {
      style: _extends({}, styles.MainStyle, style),
      ToggledStyle: _extends({}, styles.ToggledStyle, ToggledStyle)
    }),
    _react2.default.createElement(
      'span',
      { style: { fontSize: 23, color: 'white' } },
      'UP \u2192'
    )
  );
};

ScrollUpButton.defaultProps = {
  ContainerClassName: 'ScrollUpButton__Container',
  StopPosition: 0,
  ShowAtPosition: 150,
  EasingType: 'easeOutCubic',
  AnimationDuration: 500,
  TransitionClassName: 'ScrollUpButton__Toggled',
  style: {},
  ToggledStyle: {},
  children: null
};

function LessThanShowAtPosition(props, propName, componentName) {
  var ShowAtPosition = props.ShowAtPosition;

  if (props[propName]) {
    // eslint-disable-line
    var value = props[propName];
    if (typeof value === 'number') {
      if (value >= ShowAtPosition) {
        // Validate the incoming prop value againt the ShowAtPosition prop
        return new Error(propName + ' (' + value + ') in ' + componentName + ' must be less then prop: ShowAtPosition (' + ShowAtPosition + ')');
      }
      return null;
    }
    return new Error(propName + ' in ' + componentName + ' must be a number.');
  }
  return null;
}

ScrollUpButton.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
  StopPosition: LessThanShowAtPosition,
  ShowAtPosition: _propTypes2.default.number, // show button under this position,
  EasingType: _propTypes2.default.oneOf(['linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic', 'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart', 'easeInOutQuart', 'easeInQuint', 'easeOutQuint', 'easeInOutQuint', 'easeInSine', 'easeOutSine', 'easeInOutSine', 'easeInExpo', 'easeOutExpo', 'easeInOutExpo', 'easeInCirc', 'easeOutCirc', 'easeInOutCirc', 'easeInElastic', 'easeOutElastic', 'easeInOutElastic', 'easeInBack', 'easeOutBack', 'easeInOutBack', 'easeInBounce', 'easeOutBounce', 'easeInOutBounce']),
  AnimationDuration: _propTypes2.default.number, // seconds
  style: _propTypes2.default.object, // eslint-disable-line react/forbid-prop-types
  ToggledStyle: _propTypes2.default.object, // eslint-disable-line react/forbid-prop-types
  ContainerClassName: _propTypes2.default.string,
  TransitionClassName: _propTypes2.default.string
};