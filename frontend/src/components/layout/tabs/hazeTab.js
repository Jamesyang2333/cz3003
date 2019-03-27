import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CrisisOverview from "../../table/CrisisOverview";
import IncidentTable from "../../table/Table";

import MarkerPoint from "../../map/Map";
import TestList from "../testList";

import { connect } from "react-redux";
import { getAll } from "../../../actions/crisisAction";

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

class HazeTab extends Component {
  componentDidMount() {
    this.props.getAll();
  }

  render() {
    const { hazes } = this.props;
    const events = hazes;
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
                {/* ANCHOR Replace the Typography with Map UI component */}
                <MarkerPoint />
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

HazeTab.propTypes = {
  children: PropTypes.node.isRequired,
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
)(HazeTab);
