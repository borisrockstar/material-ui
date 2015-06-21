let React = require('react/addons');
let ReactTransitionGroup = React.addons.TransitionGroup;
let StylePropable = require('../mixins/style-propable');
let SlideInChild = require('./slide-in-child');


let SlideIn = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    direction: React.PropTypes.oneOf(['left', 'right', 'up', 'down'])
  },

  getDefaultProps: function() {
    return {
      direction: 'left'
    };
  },

  render: function() {
    let {
      direction,
      ...other
    } = this.props;

    let styles = this.mergeAndPrefix({
      position: 'relative',
      overflow: 'hidden',
      height: '100%'
    }, this.props.style);

    return (
      <ReactTransitionGroup {...other}
        style={styles}
        component="div">
        {this._getSlideInChildren()}
      </ReactTransitionGroup>
    );
  },

  _getSlideInChildren: function() {
    return React.Children.map(this.props.children, function(child) {
      return (
        <SlideInChild
          key={child.key}
          direction={this.props.direction}
          getLeaveDirection={this._getLeaveDirection}>
          {child}
        </SlideInChild>
      );
    }, this);
  },

  _getLeaveDirection: function() {
    return this.props.direction;
  }

});

module.exports = SlideIn;
