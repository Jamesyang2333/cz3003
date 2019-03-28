import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CrisisOverview from "../../table/CrisisOverview";
import IncidentTable from "../../table/Table";

import TestList from "../testList";
import Weather from "../../weather/weather";

import { connect } from "react-redux";
import { getHaze } from "../../../actions/crisisAction";

import GMap from "../../map/map";

const styles = {
  row: {
    display: "flex",
    flexDirection: "row wrap",
    width: "100%",
    marginTop: 30
  },
  divLeft: {
    flex: 1,
    height: "100%",
    margin: 30,
    marginTop: 10,
    textAlign: "center"
    // padding: 10
  },
  divRight: {
    height: "100%",
    flex: 3,
    margin: 10,
    marginLeft: 60,
    marginRight: 30,
    textAlign: "center"
  },
  paperLeft: {
    height: 350,
    paddingTop: 5,
    marginBottom: 20,
    textAlign: "center"
  },
  paperLeft2: {
    paddingBottom: 10
  },

  title: {
    marginBottom: 20
  },
  map: {
    height: 400,
    marginBottom: 30,
    textAligh: "center"
  },
  statistics: {
    height: 300,
    textAligh: "center"
  }
};

class HazeTab extends Component {
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
    const API_KEY = "f6ebfd8a320b95201afc5ad70ee2cca4";

    const city = "Singapore";
    const country = "Singapore";

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
    this.props.getHaze();
  }

  render() {
    const { hazes } = this.props;
    const events = hazes;
    return (
      <React.Fragment>
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
              <Paper style={styles.paperLeft2}>
                {/* ANCHOR Replace the Typography with Overview UI component */}
                <Typography>
                  <CrisisOverview type="haze" />
                </Typography>
              </Paper>
            </div>

            <div zDepth={3} style={styles.divRight}>
              <Typography variant="h4" align="left" style={styles.title}>
                Dashboard
              </Typography>
              <Paper style={styles.map}>
                {/* ANCHOR Replace the Typography with Map UI component */}
                {/* <MarkerPoint /> */}
                <GMap crises={events} />
              </Paper>

              <IncidentTable type="haze" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

HazeTab.propTypes = {
  getHaze: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  hazes: state.crisis.hazes
});

export default connect(
  mapStateToProps,
  { getHaze }
)(HazeTab);
