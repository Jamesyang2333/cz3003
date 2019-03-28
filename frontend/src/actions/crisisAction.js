import { GET_ALL, GET_DENGUE, GET_HAZE } from './types';

import axios from 'axios';

export const getAll = () => async dispatch => {
  const res = await axios.get('http://localhost:8000/api/alls/');
  dispatch({
    type: GET_ALL,
    payload: res.data
  });
};
export const getHaze = () => async dispatch => {
  const res = await axios.get('http://localhost:8000/api/hazes/');
  dispatch({
    type: GET_HAZE,
    payload: res.data
  });
};
export const getDengue = () => async dispatch => {
  const res = await axios.get('http://localhost:8000/api/dengues/');
  dispatch({
    type: GET_DENGUE,
    payload: res.data
  });
};
