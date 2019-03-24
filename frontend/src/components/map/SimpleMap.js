import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 1.36,
      lng: 103.8
    },
    zoom: 11.3
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDoZcMEFpETN7gbyOC8dZqOvriFdzDdkyo" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        />
      </div>
    );
  }
}

export default SimpleMap;
