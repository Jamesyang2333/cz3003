import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import LocationSearchInput from '../map/LocationSearchInput';
import MarkerPoint from '../map/Map';
import TestList from './testList';
import SearchBar from "../map/Autocomplete";

import { connect } from 'react-redux';
import { getAll } from '../../actions/crisisAction';

class TabContainer extends Component {
  componentDidMount() {
    this.props.getAll();
  }

  render() {
    const { alls } = this.props;
    return (
      <React.Fragment>
        {/* ANCHOR  This is only for dev phase notation.
        change of tab content depend on props.type, which can be used to detect and display different types of crisis (all / haze / dengue) */}
        <Typography component='div' variant='h6' style={{ padding: 8 * 3 }}>
          Type = {this.props.type}
        </Typography>
        <Typography component='div' variant='h6' style={{ padding: 8 * 3 }}>
          {alls.map(all => (
            <TestList info={all} />
          ))}
        </Typography>
        {this.props.children}
      </React.Fragment>
    );
  }
}

// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired
// };

const mapStateToProps = state => ({
  alls: state.crisis.alls,
  dengues: state.crisis.dengues,
  hazes: state.crisis.hazes
});

export default connect(
  mapStateToProps,
  { getAll }
)(TabContainer);
