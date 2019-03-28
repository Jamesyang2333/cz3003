import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CrisisOverview from "../../table/CrisisOverview";
import IncidentTable from "../../table/Table";

import Paper from "@material-ui/core/Paper";
import TestList from "../testList";

import { connect } from "react-redux";
import { getAll } from "../../../actions/crisisAction";

import GoogleMap from "google-map-react";
import Marker from "../../map/Marker";

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
    marginBottom: 20,
    textAlign: "center"
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

class AllTab extends Component {
  componentDidMount() {
    this.props.getAll();
  }

  render() {
    const { alls } = this.props;
    const events = alls;
    return (
      <React.Fragment>
        <Typography component="div" variant="h6" style={{ padding: 8 * 3 }}>
          {events.map(event => (
            <TestList info={event} />
          ))}
        </Typography>
        <div>
          <div style={styles.row}>
            <div zDepth={3} style={styles.divLeft}>
              <Paper style={styles.paperLeft}>
                {/* ANCHOR Replace the Typography with weather component  */}
              </Paper>
              <Paper style={styles.paperLeft}>
                {/* ANCHOR Replace the Typography with Overview UI component */}
                <Typography>
                  <CrisisOverview />
                </Typography>
              </Paper>
            </div>

            <div zDepth={3} style={styles.divRight}>
              <Typography variant="h5" align="left" style={styles.title}>
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
                <Typography>
                  <IncidentTable />
                </Typography>
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
  alls: state.crisis.alls,
  dengues: state.crisis.dengues,
  hazes: state.crisis.hazes
});

export default connect(
  mapStateToProps,
  { getAll }
)(AllTab);
