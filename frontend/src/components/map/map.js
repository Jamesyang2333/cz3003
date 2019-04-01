import React, { Component } from "react";
import { connect } from "react-redux";
import Marker from "../marker/marker";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Tooltip from "@material-ui/core/Tooltip";

class GMap extends Component {
  state = {
    crises: {}
  };

  componentDidMount = () => {
    this.loadCrisesIntoState();
  };

  componentDidUpdate = prevProps => {
    if (prevProps.crises !== this.props.crises) {
      this.loadCrisesIntoState();
    }
  };

  createMarker = () => {
    const { crises } = this.state;
    const { crisisType } = this.props;
    if (Object.keys(crises).length === 0) return null;
    console.log(crises);
    return Object.keys(crises).map(index => {
      const crisis = crises[index];
      const lat = crisis.lat;
      const lng = crisis.lng;
      const type = crisis.type;
      const location = crisis.location;
      return (
        <Marker
          key={index}
          lat={lat}
          lng={lng}
          type={type}
          location={location}
          crisisType={crisisType || []}
        />
      );
    });
  };

  loadCrisesIntoState = () => {
    console.log(this.props.crises);
    // this.setState({ crises: {} }); // clear cached crisis
    this.props.crises.forEach(crisis => {
      console.log(crisis);
      const id = crisis.record_id;
      const type = crisis.incident_type;
      geocodeByAddress(crisis.incident_location)
        .then(geoCode => getLatLng(geoCode[0]))
        .then(location => {
          this.setState({
            crises: {
              ...this.state.crises,
              [id]: {
                lat: location && location["lat"],
                lng: location && location["lng"],
                location: crisis.incident_location,
                type: type
              }
            }
          });
        });
    });
  };

  render() {
    console.log(this.props.crises);
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyA4Z60Vt8Bq84x2X32NQ286a_2_hADWzqI"
          }}
          defaultCenter={{ lat: 1.36, lng: 103.8 }}
          defaultZoom={11.3}
          draggable={true}
        >
          {this.createMarker()}
        </GoogleMapReact>
      </div>
    );
  }
}

GMap.propTypes = {
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
const mapStateToProps = state => {
  const { system } = state;
  return {
    crisisType: system && system.crisisType
  };
};

export default connect(mapStateToProps)(GMap);
