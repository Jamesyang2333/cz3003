import { GET_ALL, GET_DENGUE, GET_HAZE } from './types';

import axios from 'axios';

export const getAll = () => async dispatch => {
  const res = await axios.get('http://localhost:8000/api/alls');
  console.log(res.data);
  dispatch({
    type: GET_ALL,
    payload: res.data
  });
};
