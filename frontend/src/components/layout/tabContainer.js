import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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

function TabContainer(props) {
  return (
    <React.Fragment>
      <Typography component='div' style={{ padding: 8 * 3 }}>
        Type = {props.type}
      </Typography>
      <div>
        <div style={styles.row}>
          <div style={styles.divLeft}>
            <Paper style={styles.paperLeft}>
              <Typography>Weather</Typography>
            </Paper>
            <Paper style={styles.paperLeft}>
              <Typography>Overview</Typography>
            </Paper>
          </div>

          <div zDepth={3} style={styles.divRight}>
            <Typography style={styles.title}>Dashboard</Typography>
            <Paper style={styles.map}>
              <Typography>Map</Typography>
            </Paper>
            <Paper style={styles.statistics}>
              <Typography>Statistics UI</Typography>
            </Paper>
          </div>
        </div>
      </div>
      {/* <Grid container spacing={24}>
        <Grid item lg={3}>
          <Card>
            <CardContent>
              <Typography>Weather</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={3}>
          <Card>
            <CardContent>
              <Typography>Weather</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}
    </React.Fragment>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default TabContainer;
