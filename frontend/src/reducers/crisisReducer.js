import {
  GET_ALL,
  GET_DENGUE,
  GET_HAZE,
  GET_ALL_P,
  GET_ALL_R,
  GET_DENGUE_P,
  GET_DENGUE_R,
  GET_HAZE_P,
  GET_HAZE_R
} from '../actions/types';

const initialState = {
  alls: [],
  dengues: [],
  hazes: [],
  allsp: [],
  denguesp: [],
  hazesp: [],
  allsr: [],
  denguesr: [],
  hazesr: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        alls: action.payload
      };
    case GET_HAZE:
      return {
        ...state,
        hazes: action.payload
      };
    case GET_DENGUE:
      return {
        ...state,
        dengues: action.payload
      };
    case GET_ALL_R:
      return {
        ...state,
        allsr: action.payload
      };
    case GET_HAZE_R:
      return {
        ...state,
        hazesr: action.payload
      };
    case GET_DENGUE_R:
      return {
        ...state,
        denguesr: action.payload
      };
    case GET_ALL_P:
      return {
        ...state,
        allsp: action.payload
      };
    case GET_HAZE_P:
      return {
        ...state,
        hazesp: action.payload
      };
    case GET_DENGUE_P:
      return {
        ...state,
        denguesp: action.payload
      };
    default:
      return state;
  }
}
