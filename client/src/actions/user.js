import {SubmissionError} from 'redux-form'
import {logIn, logOut} from './auth'
import {API_BASE_URL} from '../config';
import {fetchOptions, normalizeRes} from '../utils';

export const USER_REQUEST = 'USER_REQUEST';
export const userRequest = () => ({type: USER_REQUEST});

export const USER_SUCCESS = 'USER_SUCCESS';
export const userSuccess = profile => ({type: USER_SUCCESS, profile});

export const USER_CLEAR = 'USER_CLEAR';
export const userClear = () => ({type: USER_CLEAR});

export const USER_ERROR = 'USER_ERROR';
export const userError = (error) => ({
  type: USER_ERROR,
  error
});

export const createUser = data => dispatch => {
  dispatch(userRequest());
  return fetch(
    `${API_BASE_URL}/users`, 
    fetchOptions('POST', data, true)
    )
    .then(res => normalizeRes(res))
    .then(profile => {
      dispatch(userSuccess(profile));
      dispatch(logIn(data.username, data.password));
    })
    .catch(error => {
      dispatch(userError(error));
      if (error.reason === 'validationError') {
        console.error('ERROR:', error);
        return Promise.reject( 
          new SubmissionError({
            [error.location]: error.message,
            _error: 'Validation error...'
          })
        );
      }
      return error;
    });
}

export const getProfile = () => (dispatch, getState) => {
  dispatch(userRequest());
  const userId = getState().auth.userId;
  return fetch(`${API_BASE_URL}/users/profile/${userId}`, fetchOptions('GET'))
    .then(res => {
      return normalizeRes(res)
    })
    .then(profile => {
      dispatch(userSuccess(profile))
    })
    .catch(error => {
      dispatch(userClear());
      dispatch(userError(error));
      console.error('GET PROFILE ERROR', error);
      return error;
    })
}