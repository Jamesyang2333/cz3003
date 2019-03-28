import React from "react";
import PropTypes from "prop-types";
import pin from "../../assets/pin.png";

import * as styles from "./style.scss";

const Marker = props => {
  const { incident_type, incident_location } = props;
  return (
    <div lat={props.lat} lng={props.lng}>
      {/* <Popover
        placement="top"
        title={props.type.map(type => crisisType[type]).join(", ")}
        content={location.replace(/"/g, "")}
      > */}
      {/* <Icon className={styles.container} type="warning" theme="filled" /> */}
      <img className={styles.container} src={pin} width="35" />
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
