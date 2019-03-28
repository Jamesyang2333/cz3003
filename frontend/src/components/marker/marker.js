import React from "react";
import PropTypes from "prop-types";
import Dengue from "../../assets/red.png";
import Haze from "../../assets/grey.png";
import * as styles from "./style.scss";

var type = Dengue;
const Marker = props => {
  const { incident_type, incident_location } = props;
  console.log(incident_type);
  if (incident_type === "dengue") {
    type = Dengue;
  } else {
    type = Haze;
  }

  return (
    <div lat={props.lat} lng={props.lng}>
      {/* <Popover
        placement="top"
        title={props.type.map(type => crisisType[type]).join(", ")}
        content={location.replace(/"/g, "")}
      > */}
      {/* <Icon className={styles.container} type="warning" theme="filled" /> */}
      <img className={styles.container} src={Dengue} width="30" />
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
