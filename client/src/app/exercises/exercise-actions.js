import {API_BASE_URL} from '../misc/config';
import {fetchOptions, normalizeRes} from '../misc/utils';
 
export const EXERCISE_REQUEST = 'EXERCISE_REQUEST';
export const exerciseRequest = () => ({
  type: EXERCISE_REQUEST
});

export const EXERCISE_SUCCESS = 'EXERCISE_SUCCESS';
export const exerciseSuccess = exercises => ({
  type: EXERCISE_SUCCESS,
  exercises
});

export const EXERCISE_ERROR = 'EXERCISE_ERROR';
export const exerciseError = (error) => ({
  type: EXERCISE_ERROR,
  error
});

export const EXERCISE_CLEAR_ERROR = 'EXERCISE_CLEAR_ERROR';
export const exerciseClearError = () => {
  return ({type: EXERCISE_CLEAR_ERROR})
};

export const getExercises = workoutId => (dispatch, getState) => {
  dispatch(exerciseRequest());
  const {userId} = getState().auth;

  return fetch(
    `${API_BASE_URL}/users/${userId}/workouts/${workoutId}`,
    fetchOptions('GET')
  )
  .then(normalizeRes)
  .then(({exercises}) => dispatch(exerciseSuccess(exercises)))
  .catch(err => {
    console.error('GET EXERCISE ERROR:', err);
    dispatch(exerciseError(err));
  });
}

export const createExercise = (workoutId, data) => (dispatch, getState) => {
  dispatch(exerciseRequest());
  const {userId} = getState().auth;
  return fetch(
    `${API_BASE_URL}/users/${userId}/workouts/${workoutId}/exercises`,
    fetchOptions('POST', data)
  )
  .then(normalizeRes)
  .then(() => dispatch(getExercises(workoutId)))
  .catch(error => {
    console.log('create exercise error', error);
    dispatch(exerciseError(error));
  });
};

export const editExercise = (workoutId, exrcseId, data) => (dispatch, getState) => {
  dispatch(exerciseRequest());
  const {userId} = getState().auth;
  return fetch(
    `${API_BASE_URL}/users/${userId}/workouts/${workoutId}/exercises/${exrcseId}`,
    fetchOptions('PUT', data)
  )
  .then(normalizeRes)
  .then(() => dispatch(getExercises(workoutId)))
  .catch(err => {
    console.error('EXERCISE EDIT ERROR', err);
    dispatch(exerciseError(err));
  })
}

export const deleteExercise = (workoutId, exerciseId) => (dispatch, getState) => {
  dispatch(exerciseRequest);
  const {userId} = getState().auth;
  return fetch(
    `${API_BASE_URL}/users/${userId}/workouts/${workoutId}/exercises/${exerciseId}`,
    fetchOptions('DELETE', null))
    .then(normalizeRes)
    .then(() => dispatch(getExercises(workoutId)))
    .catch( err => {
      console.error('EXERCISE DELETE ERROR', err);
      dispatch(exerciseError(err));
    })
}

