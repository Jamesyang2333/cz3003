import React, { Component } from "react";
import shouldPureComponentUpdate from "react-pure-render/function";
import PropTypes from "prop-types";
import {
  markerStyle,
  markerCircleStyle,
  markerCircleStyleHover
} from "./markerStyle.js";

export default class Marker extends Component {
  static propTypes = {
    // GoogleMap pass $hover props to hovered components
    // to detect hover it uses internal mechanism, explained in x_distance_hover example
    $hover: PropTypes.bool,
    text: PropTypes.string,
    zIndex: PropTypes.number
  };

  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  render() {
    const { text, zIndex } = this.props;

    const style = {
      ...markerStyle
      // zIndex: this.props.$hover ? 1000 : zIndex
    };

    const circleStyle = markerCircleStyle;

    return (
      <div style={style}>
        <div style={circleStyle} />
      </div>
    );
  }
}
