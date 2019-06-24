import {SubmissionError} from 'redux-form';
import jwtDecode from 'jwt-decode';
import {API_BASE_URL} from '../misc/config';
import {fetchOptions, normalizeRes} from '../misc/utils';
import {saveToken, deleteToken} from '../misc/local-storage';
import {resetApp} from '../root-actions';

export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST
});

export const AUTH_CREATE_USER_REQUEST = 'AUTH_CREATE_USER_REQUEST';
export const authCreateUserReq = () => ({
  type: AUTH_CREATE_USER_REQUEST
});

export const AUTH_REFRESH_REQUEST = 'AUTH_REFRESH_REQUEST';
export const authRefreshRequest = () => ({
  type: AUTH_REFRESH_REQUEST
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
  const {username , userId} = jwtDecode(token).payload;

  saveToken(token);
  dispatch(authSet(token));
  dispatch(authSuccess(username, userId));
}

export const logIn = (username, password) => dispatch => {
  dispatch(authLoginRequest());
  return fetch(
    `${API_BASE_URL}/auth/login`,
    fetchOptions('POST', {username, password}, true)
  )
  .then(normalizeRes)
  .then(({authToken}) => {
    storeToken(authToken, dispatch)
  })
  .catch(err => {
    console.error('LOG IN ERROR==>',err);
    dispatch(authError(err));
    if (err.reason === 'LoginError') {
      return Promise.reject( 
        new SubmissionError({
          [err.location] : err.message,
          _error: '* Incorrect username or password.'
        })
      )
    }
    return Promise.reject( new SubmissionError({
      _error: 'Server Error...'
    }))
  });
}

export const createUser = data => dispatch => {
  dispatch(authCreateUserReq());
  return fetch(
    `${API_BASE_URL}/users`, 
    fetchOptions('POST', data, true)
    )
    .then(normalizeRes)
    .then(({authToken}) => {
      storeToken(authToken, dispatch);
    })
    .catch(error => {
      dispatch(authError(error));
      if (error.reason === 'validationError') {
        console.error('ERROR:', error);
        return Promise.reject( 
          new SubmissionError({
            [error.location[0]]: error.message,
            _error: 'Validation error...'
          })
        );
      }
      return error;
    });
}

export const authPersist = token => dispatch => {
  storeToken(token, dispatch);
}

export const logOut = () => dispatch => {
  deleteToken();
  dispatch(resetApp());
}

export const refreshToken = () => dispatch => {
  dispatch(authRefreshRequest());
  return fetch(
    `${API_BASE_URL}/auth/refresh`,
    fetchOptions('POST')
  )
  .then(res => normalizeRes(res))
  .then(({authToken}) => storeToken(authToken, dispatch))
  .catch(err => {
    console.error(err);
    dispatch(logOut());
  })
};