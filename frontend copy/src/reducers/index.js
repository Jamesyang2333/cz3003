import { combineReducers } from "redux";
import crisisReducer from "./crisisReducer";

export default combineReducers({
  crisis: crisisReducer
});
