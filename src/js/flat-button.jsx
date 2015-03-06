var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/mixins/transitions');
var CustomVariables = require('./styles/variables/custom-variables');
var Typography = require('./styles/core/typography');
var Theme = require('./styles/theme');
var EnhancedButton = require('./enhanced-button');

var FlatButton = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    className: React.PropTypes.string,
    label: function(props, propName, componentName){
      if (!props.children && !props.label) {
        return new Error('Warning: Required prop `label` or `children` was not specified in `'+ componentName + '`.')
      }
    },
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool
  },

  getInitialState: function() {
    return {
      hovered: false,
    };
  },

  /** Styles */

  _getBackgroundColor: function() {
    return  this.props.primary ? CustomVariables.flatButtonPrimaryHoverColor :
            this.props.secondary ? CustomVariables.flatButtonSecondaryHoverColor :
            CustomVariables.flatButtonHoverColor;  
  },

  _main: function() {

    var style = {
      transition: Transitions.easeOut(),

      fontSize: Typography.fontStyleButtonFontSize,
      letterSpacing: 0,
      textTransform: 'uppercase',

      fontWeight: Typography.fontWeightMedium, 

      borderRadius: 2,
      userSelect: 'none',

      position: 'relative',
      overflow: 'hidden',
      backgroundColor: CustomVariables.flatButtonColor,
      color: CustomVariables.flatButtonTextColor,
      lineHeight: CustomVariables.buttonHeight + 'px',
      minWidth: CustomVariables.buttonMinWidth,
      padding: 0, 
      margin: 0,

      //This is need so that ripples do not bleed past border radius.
      //See: http://stackoverflow.com/questions/17298739/css-overflow-hidden-not-working-in-chrome-when-parent-has-border-radius-and-chil
      transform: 'translate3d(0, 0, 0)',

      color:  this.props.disabled ? CustomVariables.flatButtonDisabledTextColor :
              this.props.primary ? CustomVariables.flatButtonPrimaryTextColor :
              this.props.secondary ? CustomVariables.flatButtonSecondaryTextColor :
              Theme.textColor,
    };

    if (this.state.hovered && !this.props.disabled) {
      style.backgroundColor = this._getBackgroundColor();
    }  
    
    return style;
  },

  _label: function() {
    return {
      position: 'relative',
      padding: '0 ' + CustomVariables.spacing.desktopGutterLess + 'px',
    };
  },


  render: function() {

    var {
        label,
        primary,
        secondary,
        onMouseOver,
        onMouseOut,
        ...other
      } = this.props;

    var children = label ?
      <span style={this._label()}>{label}</span> :
      this.props.children;

    var focusRippleColor =  primary ? CustomVariables.flatButtonPrimaryFocusRippleColor : 
                            secondary ? CustomVariables.flatButtonSecondaryFocusRippleColor : 
                            CustomVariables.flatButtonFocusRippleColor;
    var touchRippleColor =  primary ? CustomVariables.flatButtonPrimaryRippleColor : 
                            secondary ? CustomVariables.flatButtonSecondaryRippleColor : 
                            CustomVariables.flatButtonRippleColor;

    return (
      <EnhancedButton {...other}
        style={this._main()}
        onMouseOver={this._onMouseOver} 
        onMouseOut={this._onMouseOut} 
        focusRippleColor={focusRippleColor}
        touchRippleColor={touchRippleColor}
        onKeyboardFocus={this._handleKeyboardFocus}>
        {children}
      </EnhancedButton>
    );
  },

  _onMouseOver: function(e) {
    this.setState({hovered: true});
    if (this.props.onMouseOver) this.props.onMouseOver(e);
  },

  _onMouseOut: function(e) {
    this.setState({hovered: false});
    if (this.props.onMouseOut) this.props.onMouseOut(e);
  },

  _handleKeyboardFocus: function(keyboardFocused) {

    if (keyboardFocused && !this.props.disabled) {
      this.getDOMNode().style.backgroundColor = this._getBackgroundColor();
    } else {
      this.getDOMNode().style.backgroundColor = 'transparent';
    }
  }


});

module.exports = FlatButton;
