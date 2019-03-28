import React, { Component } from "react";
import shouldPureComponentUpdate from "react-pure-render/function";
import PropTypes from "prop-types";
import { markerStyle, markerCircleStyle } from "./markerStyle.js";
import Geocode from "react-geocode";

import { connect } from "react-redux";
import { getAll } from "../../actions/crisisAction";

Geocode.setApiKey("AIzaSyAvPb7yu9U9UM-VYbyrP1j5jubQ8mpWMi4");

Geocode.enableDebug();

class Marker extends Component {
  static propTypes = {
    // GoogleMap pass $hover props to hovered components
    // to detect hover it uses internal mechanism, explained in x_distance_hover example
    $hover: PropTypes.bool,
    incident_location: PropTypes.string
  };

  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      address: "fetching",
      latitude: null,
      longitude: null
    };
  }

  getLatLngFromAddress(address) {
    Geocode.fromAddress(address).then(
      response => {
        this.setState({
          latitude: response.results[0].geometry.location["lat"],
          longitude: response.results[0].geometry.location["lng"]
        });
      },
      error => {
        this.setState({
          coordinates: error.message
        });
      }
    );
  }
  getAddressFromLatLong(lat, long) {
    Geocode.fromLatLng(lat, long).then(
      response => {
        this.setState({
          address: response.results[0].formatted_address
        });
      },
      error => {
        this.setState({
          address: error.message
        });
      }
    );
  }

  render() {
    const { incident_location, incident_type } = this.props;
    var address = "new york";
    this.getAddressFromLatLong({ lat: 1.39, lng: 103.93 });
    this.getLatLngFromAddress(incident_location);
    // this.getLatLngFromAddress(incident_location);
    console.log(this.state.latitude);
    console.log(this.state.longitude);
    const style = {
      ...markerStyle
    };
    const circleStyle = markerCircleStyle;

    return (
      <div style={style}>
        <div style={circleStyle} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  alls: state.crisis.alls
});

Marker.propTypes = {
  record_id: PropTypes.string,
  date: PropTypes.string,
  incident_location: PropTypes.string,
  incident_region: PropTypes.string,
  incident_type: PropTypes.string,
  incident_assistance_required: PropTypes.string,
  incident_status: PropTypes.string,
  number_of_injured: PropTypes.string,
  number_of_deaths: PropTypes
};

export default connect(
  mapStateToProps,
  {
    getAll
  }
)(Marker);
