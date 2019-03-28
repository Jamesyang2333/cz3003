const K_CIRCLE_SIZE = 20;
const K_STICK_SIZE = 0;

const markerStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: "absolute",
  width: K_CIRCLE_SIZE,
  height: K_CIRCLE_SIZE + K_STICK_SIZE,
  left: -K_CIRCLE_SIZE / 2,
  top: -(K_CIRCLE_SIZE + K_STICK_SIZE)
};

const markerCircleStyle = {
  position: "absolute",
  left: 0,
  top: 0,
  width: K_CIRCLE_SIZE,
  height: K_CIRCLE_SIZE,
  border: "3px solid #f44336",
  borderRadius: K_CIRCLE_SIZE,
  backgroundColor: "#f44336",
  textAlign: "center",
  color: "#3f51b5",
  fontSize: 15,
  fontWeight: "bold",
  padding: 0,
  cursor: "pointer"
};

const markerCircleStyleHover = {
  ...markerCircleStyle,
  border: "3px solid #3f51b5",
  color: "#f44336"
};

export {
  markerStyle,
  markerCircleStyle,
  markerCircleStyleHover,
  K_CIRCLE_SIZE,
  K_STICK_SIZE
};
