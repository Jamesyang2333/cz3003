import React, { Component } from 'react';
import { connect } from 'react-redux';
import Marker from '../marker/marker';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import DateDiff from 'date-diff';

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
    return Object.keys(crises).map(index => {
      const crisis = crises[index];
      const lat = crisis.lat;
      const lng = crisis.lng;
      const type = crisis.type;
      const location = crisis.location;
      const status = crisis.status;
      const date = crisis.date;
      const estimated_starting_time = crisis.estimated_starting_time;
      console.log(date);

      // FIXME Only show pending crisis
      if (status == 'pending' && date) {
        var timeToday = new Date();
        var timeIncident = new Date(date);
        var diff = new DateDiff(timeToday, timeIncident);
        var diffDay = diff.days();
        console.log(type);
        console.log(diffDay);
        if (
          (diffDay < 21 && type == 'dengue') ||
          (diffDay == 0 && type == 'haze')
        )
          return (
            <Marker
              key={index}
              lat={lat}
              lng={lng}
              type={type}
              location={location}
              date={date}
              estimated_starting_time={estimated_starting_time}
              crisisType={crisisType || []}
            />
          );
      }

      if (
        date &&
        // FIXME Change haze diffDay to 30 for demo purpose
        ((diffDay < 21 && type == 'dengue') || (diffDay < 30 && type == 'haze'))
      )
        return (
          <Marker
            key={index}
            lat={lat}
            lng={lng}
            type={type}
            location={location}
            date={date}
            estimated_starting_time={estimated_starting_time}
            crisisType={crisisType || []}
          />
        );
    });
  };

  loadCrisesIntoState = () => {
    // this.setState({ crises: {} }); // clear cached crisis
    this.props.crises.forEach(crisis => {
      const id = crisis.record_id;
      const type = crisis.incident_type;
      geocodeByAddress(crisis.incident_location)
        .then(geoCode => getLatLng(geoCode[0]))
        .then(location => {
          this.setState({
            crises: {
              ...this.state.crises,
              [id]: {
                lat: location && location['lat'],
                lng: location && location['lng'],
                location: crisis.incident_location,
                date: crisis.date,
                estimated_starting_time: crisis.estimated_starting_time,
                type: type,
                status: crisis.incident_status
              }
            }
          });
        });
    });
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyA4Z60Vt8Bq84x2X32NQ286a_2_hADWzqI'
          }}
          defaultCenter={{ lat: 1.36, lng: 103.8 }}
          defaultZoom={11.3}
          draggable={true}>
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
  number_of_deaths: PropTypes,
  estimated_starting_time: PropTypes.string
};
const mapStateToProps = state => {
  const { system } = state;
  return {
    crisisType: system && system.crisisType
  };
};

export default connect(mapStateToProps)(GMap);
