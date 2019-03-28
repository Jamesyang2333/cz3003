import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

import { getAll, getDengue, getHaze } from '../../actions/crisisAction';
import { connect } from 'react-redux';

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
  variant: PropTypes.oneOf(['success', 'warning']).isRequired
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

class CrisisOverview extends Component {
  componentDidMount() {
    this.props.getAll();
    this.props.getDengue();
    this.props.getHaze();
  }
  render() {
    const { alls } = this.props;
    const { classes } = this.props;
    return (
      <div>
        <h3>Crisis Overview</h3>
        <MySnackbarContentWrapper
          variant='warning'
          className={classes.margin}
          message='Pending!'
        />
        <MySnackbarContentWrapper
          variant='success'
          className={classes.margin}
          message='Resolved!'
        />
      </div>
    );
  }
}

CrisisOverview.propTypes = {
  classes: PropTypes.object.isRequired,
  getAll: PropTypes.func.isRequired,
  getHaze: PropTypes.func.isRequired,
  getDengue: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alls: state.crisis.alls,
  dengues: state.crisis.dengues,
  hazes: state.crisis.hazes
});

export default connect(
  mapStateToProps,
  { getAll, getDengue, getHaze }
)(withStyles(styles2)(CrisisOverview));
