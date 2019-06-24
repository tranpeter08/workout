import {API_BASE_URL} from '../misc/config';
import {fetchOptions, normalizeRes} from '../misc/utils';

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const getProfileRequest = () => ({type: GET_PROFILE_REQUEST});

export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const getProfileSuccess = profile => 
  ({type: GET_PROFILE_SUCCESS, profile});

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const updateProfileRequest = () => ({type: UPDATE_PROFILE_REQUEST});

export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const updateProfileSuccess = () => ({type: UPDATE_PROFILE_SUCCESS});

export const USER_ERROR = 'USER_ERROR';
export const userError = (error) => ({
  type: USER_ERROR,
  error
});

export const getProfile = () => (dispatch, getState) => {
  dispatch(getProfileRequest());
  // separate action for get profile
  const {userId} = getState().auth;
  return fetch(`${API_BASE_URL}/users/profile/${userId}`, fetchOptions('GET'))
    .then(normalizeRes)
    .then(profile => {
      dispatch(getProfileSuccess(profile));
      return true;
    })
    .catch(error => {
      dispatch(userError(error));
      console.error('GET PROFILE ERROR', error);
      return error;
    })
}

export const updateProfile = data => (dispatch, getState) => {
  dispatch(updateProfileRequest());
  const {userId} = getState().auth;
  return fetch(
    `${API_BASE_URL}/users/profile/${userId}`,
    fetchOptions('PUT', data)
  )
  .then(normalizeRes)
  .then(() => {
    dispatch(updateProfileSuccess());
    dispatch(updateProfile());
  })
  .catch(err => {
    dispatch(userError(err));
    console.error('UPDATE PROFILE ERROR:', err);
  })
}