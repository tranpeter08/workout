'use strict';
import {SubmissionError} from 'redux-form'

import {logIn} from './auth'
import {API_BASE_URL} from '../config';
import {fetchOptions, normalizeRes} from '../utils';

export const USER_REQUEST = 'USER_REQUEST';
export const userRequest = () => ({type: USER_REQUEST});

export const USER_SUCCESS = 'USER_SUCCESS';
export const userSuccess = () => ({type: USER_SUCCESS});

export const USER_ERROR = 'USER_ERROR';
export const userError = (error) => ({
  type: USER_ERROR,
  error
});

export const createUser = data => dispatch => {
  dispatch(userRequest);
  return fetch(`${API_BASE_URL}/users`, fetchOptions('POST', data))
    .then(res => normalizeRes(res))
    .then(res => {
      dispatch(userSuccess);
      return res.json();
    })
    .catch(error => {
      dispatch(userError(error))
      console.error('ERROR:', error);
      return {error};
    });
}

export const getProfile = (userId, token) => {
  return fetch(`${API_BASE_URL}/profile/${userId}`, fetchOptions('GET', null, token))
    .then(res => {
      console.log('RES ===', res.json())
      return res.json()
    })
    .catch(err => {
      console.error(err);
      return err;
    })  
}
