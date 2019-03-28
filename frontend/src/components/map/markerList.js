import React from "react";
import Marker from "./Marker";
import Geocode from "react-geocode";
import shouldPureComponentUpdate from "react-pure-render/function";
import { connect } from "react-redux";
import { getAll } from "../../actions/crisisAction";
import PropTypes from "prop-types";
import GoogleMap from "google-map-react";

Geocode.setApiKey("AIzaSyAvPb7yu9U9UM-VYbyrP1j5jubQ8mpWMi4");
// Geocode.enableDebug();

class MarkerList extends React.Component {
  componentDidMount() {
    this.props.getAll();
  }

  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    const { alls } = this.props;
    const events = alls;

    console.log("Enter the function");
    console.log(events);
    // const { incident_location, incident_type } = this.props;

    // const latitude = this.state.latitude;
    // const longitude = this.state.longitude;
    // console.log(incident_location);
    // console.log(latitude);
    // console.log(longitude);
    return (
      <GoogleMap
        apiKey={"AIzaSyBwDk66KgX_FFx5Mj_Alik_pijCAD7-vU0"} // set if you need stats etc ...
        center={{
          lat: 1.36,
          lng: 103.8
        }}
        zoom={11.3}
      >
        {events.map(event => {
          this.getLatLngFromAddress(event.incident_location);
          return (
            <Marker
              lat={this.event.state.latitude}
              lng={this.event.state.longitude}
            />
          );
        })}
        ;
      </GoogleMap>
    );
  }
}

MarkerList.propTypes = {
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

const mapStateToProps = state => ({
  alls: state.crisis.alls,
  dengues: state.crisis.dengues,
  hazes: state.crisis.hazes
});

export default connect(
  mapStateToProps,
  { getAll }
)(MarkerList);
