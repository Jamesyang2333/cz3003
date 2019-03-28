import React from "react";

export default function TestList(props) {
  const { incident_location, incident_region, record_id } = props.info;
  return (
    <React.Fragment>
      {record_id} {incident_location} {incident_region}
      <br />
    </React.Fragment>
  );
}
