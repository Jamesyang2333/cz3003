import { GET_ALL, GET_DENGUE, GET_HAZE } from '../actions/types';

const initialState = {
  alls: [],
  dengs: [],
  hazes: []
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
        dengs: action.payload
      };
    default:
      return state;
  }
}
