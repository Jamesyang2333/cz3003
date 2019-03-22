import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  glow: {
    // flexGrow: 1,
    textAlign: 'left'
  },
  buttonGroup: {
    marginLeft: '15px'
  },
  loginButton: {
    marginLeft: 'auto'
  },

  tabsRoot: {
    marginLeft: '24px',
    borderBottom: '1px solid #e8e8e8'
  },
  tabsIndicator: {
    backgroundColor: '#1890ff'
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1
    },
    '&$tabSelected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium
    },
    '&:focus': {
      color: '#40a9ff'
    }
  }
});

class Header extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position='static' color='default'>
          <Toolbar variant='dense'>
            <Typography variant='h5' color='inherit' className={classes.glow}>
              Crisis Management System
            </Typography>
            <div className={classes.buttonGroup}>
              <Button color='primary'>Home</Button>
              <Button color='primary'>Report</Button>
            </div>

            <div className={classes.loginButton}>
              <Button color='inherit'>Login</Button>
            </div>
          </Toolbar>
          <Tabs
            value={value}
            onChange={this.handleChange}
            classes={{
              root: classes.tabsRoot,
              indicator: classes.tabsIndicator
            }}>
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label='All Incidents'
            />
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label='Dengue'
            />
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label='Haze'
            />
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
