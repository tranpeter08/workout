'use strict';
import {SubmissionError} from 'redux-form';
import jwtDecode from 'jwt-decode';

import {API_BASE_URL} from '../config';
import {fetchOptions} from '../utils';
import {saveToken, loadToken, deleteToken} from '../local-storage';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
  type: AUTH_REQUEST
});

export const AUTH_SET = 'AUTH_SET';
export const authSet = token => ({
  type: AUTH_SET,
  token
})

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = user => ({
  type: AUTH_SUCCESS,
  user
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
  type: AUTH_ERROR,
  error
});

const storeToken = (token, dispatch) => {
  const decodedJwt = jwtDecode(token);
  console.log('decoded JWT ===>',decodedJwt);
  dispatch(authSet(token));
  saveToken(token);
  dispatch(authSuccess(decodedJwt))
}

export const logIn = (username, password) => dispatch => {
  dispatch(authRequest);
  fetch(
    `${API_BASE_URL}/auth/login`,
    fetchOptions('POST', {username, password})
  )
  .then(res => res.json())
  .then(({authToken}) => {
    console.log('auth token ===>', authToken);
    storeToken(authToken, dispatch)
  })
  .catch(err => {
    console.error(err);
    return Promise.reject(new SubmissionError({err}))
  });

  
  }

export const refreshToken = () => dispatch => {
  dispatch(authRequest);
  const token = localStorage.getItem('authToken');
  return fetch(
    `${API_BASE_URL}/auth/refresh`,
    fetchOptions('POST', null, token )
  )
  .then(res => res.json())
  .then(({token}) => storeToken(token, dispatch))
  .catch(err => {
    console.error(err);
    return Promise.reject(new SubmissionError({err}))
  })
};
// auth req, success, error
  // request auth token
  // decode auth token to get user ID
  // save token to local storage
  // use ID to get profile
