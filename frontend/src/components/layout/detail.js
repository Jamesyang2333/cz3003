import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import {
  FormatListNumbered,
  Category,
  LocationOn,
  Map,
  AccessibilityNew,
  NotificationImportant,
  InvertColors,
  Opacity,
  AlarmOn,
  AccessTime,
  Dehaze
} from '@material-ui/icons';

const styles = {
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  }
};

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

class Detail extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, event } = this.props;
    const {
      date,
      estimated_starting_time,
      incident_assistance_required,
      incident_location,
      incident_region,
      incident_status,
      incident_type,
      number_of_death,
      number_of_injured,
      pollutant_standards_index,
      record_id
    } = event;

    return (
      <div>
        <IconButton className={classes.button} aria-label='UnfoldMore'>
          <UnfoldMore onClick={this.handleClickOpen} />
        </IconButton>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar style={{ paddingLeft: '0px' }}>
              <IconButton
                color='inherit'
                onClick={this.handleClose}
                aria-label='Close'>
                <CloseIcon />
              </IconButton>
              <Typography variant='h6' color='inherit' className={classes.flex}>
                Details
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <FormatListNumbered />
              </ListItemIcon>
              <ListItemText primary='Record ID' secondary={record_id} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Category />
              </ListItemIcon>
              <ListItemText
                primary='Type'
                secondary={incident_type.replace(/^./, function(str) {
                  return str.toUpperCase();
                })}
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <LocationOn />
              </ListItemIcon>
              <ListItemText
                primary='Location'
                secondary={incident_location
                  .toLowerCase()
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Map />
              </ListItemIcon>
              <ListItemText
                primary='Region'
                secondary={incident_region
                  .replace(/([a-z](?=[A-Z]))/g, '$1 ')
                  .replace(/^./, function(str) {
                    return str.toUpperCase();
                  })}
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <AccessibilityNew />
              </ListItemIcon>
              <ListItemText
                primary='Assistance Required'
                secondary={incident_assistance_required
                  .replace(/([a-z](?=[A-Z]))/g, '$1 ')
                  .replace(/^./, function(str) {
                    return str.toUpperCase();
                  })}
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <NotificationImportant />
              </ListItemIcon>
              <ListItemText
                primary='Status'
                secondary={incident_status.replace(/^./, function(str) {
                  return str.toUpperCase();
                })}
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Opacity />
              </ListItemIcon>
              <ListItemText
                primary='Number of Deaths'
                secondary={number_of_death ? number_of_death : 'N/A'}
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <InvertColors />
              </ListItemIcon>
              <ListItemText
                primary='Number of Injured'
                secondary={number_of_injured ? number_of_injured : 'N/A'}
              />
            </ListItem>
            <Divider />
            {incident_type === 'haze' ? (
              <div>
                <ListItem button>
                  <ListItemIcon>
                    <Dehaze />
                  </ListItemIcon>
                  <ListItemText
                    primary='Pollutant Standard Index'
                    secondary={
                      pollutant_standards_index
                        ? pollutant_standards_index
                        : 'N/A'
                    }
                  />
                </ListItem>
                <Divider />
              </div>
            ) : null}

            <ListItem button>
              <ListItemIcon>
                <AlarmOn />
              </ListItemIcon>
              <ListItemText
                primary='Estimated Starting Time'
                secondary={new Date(estimated_starting_time)
                  .toString()
                  .slice(0, 25)}
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <AccessTime />
              </ListItemIcon>
              <ListItemText
                primary='Report Time'
                secondary={new Date(date).toString().slice(0, 25)}
              />
            </ListItem>
            <Divider />
          </List>
        </Dialog>
      </div>
    );
  }
}

Detail.propTypes = {
  classes: PropTypes.object.isRequired
};

// function getCamelCaseArray(camel) {
//   var reg = /([a-z0-9])([A-Z])/g;
//   return camel.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(' ');
// }

export default withStyles(styles)(Detail);
