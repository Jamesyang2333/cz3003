import React from "react";
import PropTypes from "prop-types";
import Dengue from "../../assets/Dengue.png";
import Haze from "../../assets/Haze.png";
import * as styles from "./style.scss";

var pinType = Dengue;
const Marker = props => {
  const { type } = props;

  if (type === "dengue") {
    pinType = Dengue;
  } else {
    pinType = Haze;
  }

  return (
    <div lat={props.lat} lng={props.lng}>
      {/* <Popover
        placement="top"
        title={props.type.map(type => crisisType[type]).join(", ")}
        content={location.replace(/"/g, "")}
      > */}
      {/* <Icon className={styles.container} type="warning" theme="filled" /> */}
      <img className={styles.container} src={pinType} width="30" />
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
