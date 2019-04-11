import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import pink from '@material-ui/core/colors/pink';
import moduleName from '@material-ui/core/colors/blueGrey';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

import {
  getAll_P,
  // getAll_R,
  getDengue_P,
  // getDengue_R,
  getHaze_P
  // getHaze_R
} from '../../actions/crisisAction';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[500]
  },
  warning: {
    backgroundColor: amber[600]
  },
  info: {
    backgroundColor: blueGrey[400]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby='client-snackbar'
      message={
        <span id='client-snackbar' className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key='close'
          aria-label='Close'
          color='inherit'
          className={classes.close}
          onClick={onClose}
        />
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  variant: PropTypes.oneOf(['success', 'warning', 'info']).isRequired
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

class CrisisOverview extends Component {
  componentDidMount() {
    this.props.getAll_P();
    this.props.getDengue_P();
    this.props.getHaze_P();
  }
  render() {
    const { type, classes } = this.props;
    var pendings;
    // var resolveds;
    if (type === 'all') {
      const { allsp, allsr } = this.props;
      pendings = allsp;
      // resolveds = allsr;
    } else if (type === 'haze') {
      const { hazesp, hazesr } = this.props;
      pendings = hazesp;
      // resolveds = hazesr;
    } else {
      const { denguesp, denguesr } = this.props;
      pendings = denguesp;
      // resolveds = denguesr;
    }
    var southWest;
    var northWest;
    var southEast;
    var northEast;
    var central;
    southWest =
      pendings
        .filter(p => p.incident_region === 'southWest')
        .length // + resolveds.filter(p => p.incident_region === 'southWest').length
        .toString() + ' pending incident(s) in Southwest';
    northWest =
      pendings
        .filter(p => p.incident_region === 'northWest')
        .length // +resolveds.filter(p => p.incident_region === 'northWest').length
        .toString() + ' pending incident(s) in Northwest';
    southEast =
      pendings
        .filter(p => p.incident_region === 'southEast')
        .length // +resolveds.filter(p => p.incident_region === 'southEast').length
        .toString() + ' pending incident(s) in Southeast';
    northEast =
      pendings
        .filter(p => p.incident_region === 'northEast')
        .length // +resolveds.filter(p => p.incident_region === 'northEast').length
        .toString() + ' pending incident(s) in Northeast';
    central =
      pendings
        .filter(p => p.incident_region === 'central')
        .length // +resolveds.filter(p => p.incident_region === 'central').length
        .toString() + ' pending incident(s) in Central';
    return (
      <div>
        <Typography variant='h6' align='left' style={{ paddingTop: '5px' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;Crisis By Region
        </Typography>

        <MySnackbarContentWrapper
          variant='info'
          className={classes.margin}
          message={central}
        />
        <MySnackbarContentWrapper
          variant='info'
          className={classes.margin}
          message={southWest}
        />
        <MySnackbarContentWrapper
          variant='info'
          className={classes.margin}
          message={southEast}
        />
        <MySnackbarContentWrapper
          variant='info'
          className={classes.margin}
          message={northWest}
        />
        <MySnackbarContentWrapper
          variant='info'
          className={classes.margin}
          message={northEast}
        />
      </div>
    );
  }
}

CrisisOverview.propTypes = {
  classes: PropTypes.object.isRequired,
  getAll_P: PropTypes.func.isRequired,
  getHaze_P: PropTypes.func.isRequired,
  getDengue_P: PropTypes.func.isRequired
  // getAll_R: PropTypes.func.isRequired,
  // getHaze_R: PropTypes.func.isRequired,
  // getDengue_R: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  allsp: state.crisis.allsp,
  denguesp: state.crisis.denguesp,
  hazesp: state.crisis.hazesp
  // allsr: state.crisis.allsr,
  // denguesr: state.crisis.denguesr,
  // hazesr: state.crisis.hazesr
});

export default connect(
  mapStateToProps,
  { getAll_P, getDengue_P, getHaze_P }
)(withStyles(styles2)(CrisisOverview));
