import {API_BASE_URL} from '../config';
import {fetchOptions, normalizeRes} from '../utils';
import {getProfile} from './user';
 
export const EXERCISE_REQUEST = 'EXERCISE_REQUEST';
export const exerciseRequest = () => ({
  type: EXERCISE_REQUEST
});

export const EXERCISE_SUCCESS = 'EXERCISE_SUCCESS';
export const exerciseSuccess = () => ({
  type: EXERCISE_SUCCESS
});

export const EXERCISE_ERROR = 'EXERCISE_ERROR';
export const exerciseError = (error) => ({
  type: EXERCISE_ERROR,
  error
});

export const EXERCISE_CLEAR_ERROR = 'EXERCISE_CLEAR_ERROR';
export const exerciseClearError = () => ({type: EXERCISE_CLEAR_ERROR});

export const createExercise = (workoutId, data) => (dispatch, getState) => {
  dispatch(exerciseRequest());
  const {userId} = getState().auth.userId;
  return fetch(
    `${API_BASE_URL}/users/${userId}/workouts/${workoutId}/exercises`,
    fetchOptions('POST', data)
  )
  .then(res => normalizeRes(res))
  .then(() => {
    dispatch(getProfile(userId));
    dispatch(exerciseSuccess());
  })
  .catch(error => {
    console.log('create exercise error', error);
    dispatch(exerciseError(error));
    return error;
  });
};

export const editExercise = (workoutId, exrcseId, data) => (dispatch, getState) => {
  dispatch(exerciseRequest());
  const {userId} = getState().auth.userId;
  return fetch(
    `${API_BASE_URL}/users/${userId}/workouts/${workoutId}/exercises/${exrcseId}`,
    fetchOptions('PUT', data)
  )
  .then(res => normalizeRes(res))
  .then(() => {
    dispatch(getProfile(userId));
    dispatch(exerciseSuccess());
  })
  .catch(err => {
    console.error('EXERCISE EDIT ERROR', err);
    dispatch(exerciseError(err));
    return err;
  })
}

export const deleteExercise = (workoutId, exerciseId) => (dispatch, getState) => {
  dispatch(exerciseRequest);
  const {userId} = getState().auth.userId;
  return fetch(
    `${API_BASE_URL}/users/${userId}/workouts/${workoutId}/exercises/${exerciseId}`,
    fetchOptions('DELETE', null))
    .then(res => normalizeRes(res))
    .then(() => {
      dispatch(getProfile(userId));
      dispatch(exerciseSuccess());
    })
    .catch( err => {
      console.error('EXERCISE DELETE ERROR', err);
      dispatch(exerciseError(err));
      return err;
    })
}

