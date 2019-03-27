import { GET_ALL, GET_DENGUE, GET_HAZE } from '../actions/types';

const initialState = {
  alls: [],
  dengues: [],
  hazes: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        alls: action.payload
      };
    default:
      return state;
  }
}
