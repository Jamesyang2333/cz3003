import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

const incidents = [];

function IncidentTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Incident id</TableCell>
            <TableCell align="right">Incident type</TableCell>
            <TableCell align="right">Incident location</TableCell>
            <TableCell align="right">Incident time</TableCell>
            <TableCell align="right">Incident status</TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {incidents.map(incident => (
              <TableRow></TableRow>
            // <TableRow key={incident.id}>
            //   <TableCell component="th" scope="row">
            //     {incident.}
            //   </TableCell>
            // </TableRow>
          )}
        </TableBody> */}
      </Table>
    </Paper>
  );
}

IncidentTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IncidentTable);