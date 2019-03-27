import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import IncidentTable from "../table/Table";
import CrisisOverview from "../table/CrisisOverview";
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

class TabContainer extends Component {
  render() {
    return (
      <React.Fragment>
        {/* ANCHOR  This is only for dev phase notation.
        change of tab content depend on props.type, which can be used to detect and display different types of crisis (all / haze / dengue) */}
        <Typography component="div" variant="h6" style={{ padding: 8 * 3 }}>
          Type = {this.props.type}
        </Typography>

        {this.props.children}
      </React.Fragment>
    );
  }
}

export default TabContainer;
