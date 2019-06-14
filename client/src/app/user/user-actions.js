import {SubmissionError} from 'redux-form';
import {logIn} from '../auth/auth-actions';
import {API_BASE_URL} from '../misc/config';
import {fetchOptions, normalizeRes} from '../misc/utils';

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
            [error.location[0]]: error.message,
            _error: 'Validation error...'
          })
        );
      }
      return error;
    });
}

export const getProfile = () => (dispatch, getState) => {
  dispatch(userRequest());
  const {userId} = getState().auth;
  return fetch(`${API_BASE_URL}/users/profile/${userId}`, fetchOptions('GET'))
    .then(normalizeRes)
    .then(profile => {
      dispatch(userSuccess(profile));
      return true;
    })
    .catch(error => {
      dispatch(userError(error));
      console.error('GET PROFILE ERROR', error);
      return error;
    })
}

export const updateProfile = data => (dispatch, getState) => {
  dispatch(userRequest());
  const {userId} = getState().auth;
  return fetch(
    `${API_BASE_URL}/users/profile/${userId}`,
    fetchOptions('PUT', data)
  )
  .then(normalizeRes)
  .then(profile => dispatch(getProfile()))
  .catch(err => {
    dispatch(userError(err));
    console.error('UPDATE PROFILE ERROR:', err);
  })
}