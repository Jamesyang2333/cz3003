import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import CrisisOverview from '../../table/CrisisOverview';
import CrisisByRegion from '../../table/CrisisByRegion';
import IncidentTable from '../../table/Table';
import AirQuality from '../../weather/airQuality';

import Paper from '@material-ui/core/Paper';

import Weather from '../../weather/weather';

import { connect } from 'react-redux';
import { getAll } from '../../../actions/crisisAction';

import GMap from '../../map/map';

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
    marginLeft: 50,
    textAlign: 'center'
    // padding: 10
  },
  divRight: {
    height: '100%',
    flex: 3,
    margin: 10,
    marginLeft: 20,
    marginRight: 50,
    textAlign: 'center'
  },
  paperLeft: {
    height: 300,
    marginBottom: 20,
    paddingTop: 5,
    textAlign: 'center'
  },
  paperLeft2: {
    paddingBottom: 10,
    marginBottom: 20
  },

  title: {
    marginBottom: 20
  },
  map: {
    height: 600,
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

    fetch(`https://api.data.gov.sg/v1/environment/pm25`)
      .then(response => response.json())
      .then(jsonData => {
        // jsonData is parsed json object received from url
        console.log(jsonData);
        this.setState({
          west: jsonData.items[0].readings.pm25_one_hourly.west,
          east: jsonData.items[0].readings.pm25_one_hourly.east,
          north: jsonData.items[0].readings.pm25_one_hourly.north,
          south: jsonData.items[0].readings.pm25_one_hourly.south,
          central: jsonData.items[0].readings.pm25_one_hourly.central
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
    // const pendings = allsp;
    // console.log(events);
    return (
      <React.Fragment>
        <div>
          <div style={styles.row}>
            <div zDepth={3} style={styles.divLeft}>
              <Paper style={styles.paperLeft2}>
                <Typography>
                  <CrisisOverview type='all' />
                </Typography>
              </Paper>
              <Paper style={styles.paperLeft2}>
                <Typography>
                  <CrisisByRegion type='all' />
                </Typography>
              </Paper>
              <Paper style={styles.paperLeft}>
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
                <AirQuality
                  west={this.state.west}
                  east={this.state.east}
                  north={this.state.north}
                  south={this.state.south}
                  central={this.state.central}
                />
              </Paper>
            </div>

            <div zDepth={3} style={styles.divRight}>
              <Typography variant='h4' align='left' style={styles.title}>
                Dashboard
              </Typography>
              <Paper style={styles.map}>
                <GMap crises={events} />
              </Paper>
              <IncidentTable type='all' events={events} />
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
