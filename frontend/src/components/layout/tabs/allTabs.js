import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import CrisisOverview from '../../table/CrisisOverview';
import IncidentTable from '../../table/Table';


import Paper from '@material-ui/core/Paper';

import MarkerPoint from '../../map/Map';
import TestList from '../testList';
import Weather from '../../weather/weather';

import { connect } from 'react-redux';
import { getAll } from '../../../actions/crisisAction';

import GoogleMap from "google-map-react";
import Marker from "../../map/Marker";

const styles = {
  row: {
    display: 'flex',
    flexDirection: 'row wrap',
    width: '100%',
    marginTop: 30
  },
  divLeft: {
    flex: 1,
    height: '100%',
    margin: 30,
    marginTop: 10,
    textAlign: 'center'
    // padding: 10
  },
  divRight: {
    height: '100%',
    flex: 3,
    margin: 10,
    marginLeft: 60,
    marginRight: 30,
    textAlign: 'center'
  },
  paperLeft: {
    height: 350,
    marginBottom: 20,
    paddingTop: 5,
    textAlign: 'center'
  },

  title: {
    marginBottom: 20
  },
  map: {
    height: 400,
    marginBottom: 30,
    textAligh: 'center'
  },
  statistics: {
    height: 300,
    textAligh: 'center'
  }
};

class AllTab extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    sky: undefined,
    wind: undefined,
    pressure: undefined
  };

  componentDidMount() {
    const API_KEY = 'f6ebfd8a320b95201afc5ad70ee2cca4';

    const city = 'Singapore';
    const country = 'Singapore';

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
    )
      .then(response => response.json())
      .then(jsonData => {
        // jsonData is parsed json object received from url
        // console.log(jsonData);
        this.setState({
          temperature: jsonData.main.temp,
          city: jsonData.name,
          country: jsonData.sys.country,
          humidity: jsonData.main.humidity,
          sky: jsonData.weather[0].description,
          wind: jsonData.wind.speed,
          pressure: jsonData.main.pressure
        });
      })
      .catch(error => {
        console.error(error);
      });
    this.props.getAll();
  }

  render() {
    const { alls } = this.props;
    const events = alls;
    return (
      <React.Fragment>
        <Typography component='div' variant='h6' style={{ padding: 8 * 3 }}>
          {events.map(event => (
            <TestList info={event} />
          ))}
        </Typography>
        <div>
          <div style={styles.row}>
            <div zDepth={3} style={styles.divLeft}>
              <Paper style={styles.paperLeft}>
                {/* ANCHOR Replace the Typography with weather component  */}
                <Weather
                  temperature={this.state.temperature}
                  humidity={this.state.humidity}
                  city={this.state.city}
                  country={this.state.country}
                  sky={this.state.sky}
                  wind={this.state.wind}
                  pressure={this.state.pressure}
                />
              </Paper>
              <Paper style={styles.paperLeft}>
                {/* ANCHOR Replace the Typography with Overview UI component */}
                <Typography>
                  <CrisisOverview />
                </Typography>
              </Paper>
            </div>

            <div zDepth={3} style={styles.divRight}>
              <Typography variant='h5' align='left' style={styles.title}>
                Dashboard
              </Typography>
              <Paper style={styles.map}>
                <GoogleMap
                  apiKey={"AIzaSyBwDk66KgX_FFx5Mj_Alik_pijCAD7-vU0"} // set if you need stats etc ...
                  center={{
                    lat: 1.36,
                    lng: 103.8
                  }}
                  zoom={11.3}
                >
                  {/* <p data-åtip="hello world">Tooltip</p> */}
                  {events.map(event => (
                    <Marker
                      incident_location={event.incident_location}
                      incident_region={event.incident_region}
                      incident_type={event.incident_type}
                    />
                  ))}
                </GoogleMap>
              </Paper>
              <Paper style={styles.statistics}>
                {/* ANCHOR Replace the Typography with Statistics UI component */}
                <IncidentTable />
              </Paper>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

AllTab.propTypes = {
  getAll: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alls: state.crisis.alls
});

export default connect(
  mapStateToProps,
  { getAll }
)(AllTab);
