import {SubmissionError} from 'redux-form';
import jwtDecode from 'jwt-decode';
import {API_BASE_URL} from '../config';
import {fetchOptions, normalizeRes} from '../utils';
import {saveToken, deleteToken} from '../local-storage';
import {userClear} from './user';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
  type: AUTH_REQUEST
});

export const AUTH_SET = 'AUTH_SET';
export const authSet = token => ({
  type: AUTH_SET, 
  token
});

export const AUTH_CLEAR = 'AUTH_CLEAR';
export const authClear = () => ({
  type: AUTH_CLEAR
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = (username, userId) => ({
  type: AUTH_SUCCESS,
  username,
  userId
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
  type: AUTH_ERROR,
  error
});

const storeToken = (token, dispatch) => {
  const decodedJwt = jwtDecode(token).payload;
  saveToken(token);
  dispatch(authSet(token));
  dispatch(authSuccess(decodedJwt.username, decodedJwt.userId));
}

export const logIn = (username, password) => dispatch => {
  dispatch(authRequest());
  return fetch(
    `${API_BASE_URL}/auth/login`,
    fetchOptions('POST', {username, password}, true)
  )
  .then(res => normalizeRes(res))
  .then(({authToken}) => {
    storeToken(authToken, dispatch)
  })
  .catch(err => {
    console.error('LOG IN ERROR==>',err);
    dispatch(authError(err));
    if (err.reason === 'LoginError') {
      
      return new SubmissionError({
          _error: 'Login failure'
        }) 
    }
    return err;
  });
}

export const authPersist = token => dispatch => {
  storeToken(token, dispatch);
}

export const logOut = () => dispatch => {
  dispatch(userClear());
  deleteToken();
  dispatch(authClear());
}

export const refreshToken = () => dispatch => {
  dispatch(authRequest);
  const token = localStorage.getItem('authToken');
  return fetch(
    `${API_BASE_URL}/auth/refresh`,
    fetchOptions('POST', null, token )
  )
  .then(({token}) => storeToken(token, dispatch))
  .catch(err => {
    console.error(err);
    dispatch(authError(err));
    dispatch(logOut());
    return err;
  })
};