import React from 'react';
import PropTypes from 'prop-types';
import Dengue from '../../assets/Dengue.png';
import Haze from '../../assets/Haze.png';
import * as styles from './style.scss';
import Tooltip from '@material-ui/core/Tooltip';

var pinType = Dengue;
var tooltipTitle = 'Dengue';

const Marker = props => {
  const { type } = props;

  if (type === 'dengue') {
    pinType = Dengue;
    tooltipTitle = 'Dengue';
  } else {
    pinType = Haze;
    tooltipTitle = 'Haze';
  }

  return (
    <div lat={props.lat} lng={props.lng}>
      {/* <Popover
        placement="top"
        title={props.type.map(type => crisisType[type]).join(", ")}
        content={location.replace(/"/g, "")}
      > */}
      {/* <Icon className={styles.container} type="warning" theme="filled" /> */}
      <Tooltip title={tooltipTitle}>
        <img className={styles.container} src={pinType} width='30' />
      </Tooltip>

      {/* </Popover> */}
    </div>
  );
};

Marker.propTypes = {
  record_id: PropTypes.string,
  incident_location: PropTypes.string,
  incident_type: PropTypes.string
};

export default Marker;
