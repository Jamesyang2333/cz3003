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
} from './types';

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

export const getAll_P = () => async dispatch => {
  const res = await axios.get('http://localhost:8000/api/allsp/');
  dispatch({
    type: GET_ALL_P,
    payload: res.data
  });
};
export const getHaze_P = () => async dispatch => {
  const res = await axios.get('http://localhost:8000/api/hazesp/');
  dispatch({
    type: GET_HAZE_P,
    payload: res.data
  });
};
export const getDengue_P = () => async dispatch => {
  const res = await axios.get('http://localhost:8000/api/denguesp/');
  dispatch({
    type: GET_DENGUE_P,
    payload: res.data
  });
};

export const getAll_R = () => async dispatch => {
  const res = await axios.get('http://localhost:8000/api/allsr/');
  dispatch({
    type: GET_ALL_R,
    payload: res.data
  });
};
export const getHaze_R = () => async dispatch => {
  const res = await axios.get('http://localhost:8000/api/hazesr/');
  dispatch({
    type: GET_HAZE_R,
    payload: res.data
  });
};
export const getDengue_R = () => async dispatch => {
  const res = await axios.get('http://localhost:8000/api/denguesr/');
  dispatch({
    type: GET_DENGUE_R,
    payload: res.data
  });
};
