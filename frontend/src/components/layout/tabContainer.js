import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import IncidentTable from "../table/Table";
import CrisisOverview from "../table/CrisisOverview";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <React.Fragment>
      {/* ANCHOR  This is only for dev phase notation.
      change of tab content depend on props.type, which can be used to detect and display different types of crisis (all / haze / dengue) */}
      <Typography component="div" variant="h6" style={{ padding: 8 * 3 }}>
        Type = {props.type}
      </Typography>
      <div>
        <div style={styles.row}>
          <div zDepth={3} style={styles.divLeft}>
            <Paper style={styles.paperLeft}>
              {/* ANCHOR Replace the Typography with weather component  */}
              <Weather />
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
            {/* ANCHOR Replace the Typography with Statistics UI component */}
            <Paper style={styles.statistics}>
              <Typography>
                <IncidentTable />
              </Typography>
            </Paper>
class TabContainer extends Component {
  render() {
    return (
      <React.Fragment>
        {/* ANCHOR  This is only for dev phase notation.
        change of tab content depend on props.type, which can be used to detect and display different types of crisis (all / haze / dengue) */}
        <Typography component='div' variant='h6' style={{ padding: 8 * 3 }}>
          Type = {this.props.type}
        </Typography>

        {this.props.children}
      </React.Fragment>
    );
  }
}

export default TabContainer;
