import {API_BASE_URL} from '../misc/config';
import {fetchOptions, normalizeRes} from '../misc/utils';
import {getProfile} from '../user/user-actions';

export const WORKOUT_REQUEST = 'WORKOUT_REQUEST';
export const workoutRequest = () => ({
  type: WORKOUT_REQUEST
});

export const WORKOUT_SUCCESS = 'WORKOUT_SUCCESS';
export const workoutSuccess = () => ({type: WORKOUT_SUCCESS});

export const WORKOUT_ERROR = 'WORKOUT_ERROR';
export const workoutError = error => ({
  type: WORKOUT_ERROR,
  error
});

export const WORKOUT_CLEAR_ERRORS = 'WORKOUT_CLEAR_ERRORS';
export const clearErrors = () => ({type: WORKOUT_CLEAR_ERRORS});

export const createWorkout = data => (dispatch, getState) => {
  dispatch(workoutRequest());
  const userId = getState().auth.userId;

  return fetch(
      `${API_BASE_URL}/users/${userId}/workouts`, 
      fetchOptions('POST', data)
    )
    .then(res => normalizeRes(res))
    .then(() => {
      dispatch(getProfile(userId))
      dispatch(workoutSuccess())
    })
    .catch(err => {
      console.error('create workout error ==>', err);
      dispatch(workoutError(err))
      return err
    });
};

export const editWorkout = (data, workoutId) => (dispatch, getState )=> {
  dispatch(workoutRequest());
  console.log('test');
  const userId = getState().auth.userId;
  
  return fetch(
      `${API_BASE_URL}/users/${userId}/workouts/${workoutId}`,
      fetchOptions('PUT', data)
    )
    .then(res => normalizeRes(res))
    .then(() => {
      dispatch(getProfile(userId));
      dispatch(workoutSuccess());
    })
    .catch(err => {
      console.error('WORKOUT EDIT ERROR ==>', err);
      dispatch(workoutError(err));
      return err;
    })
};

export const deleteWorkout = workoutId => (dispatch, getState ) => {
  dispatch(workoutRequest());
  const userId = getState().auth.userId;

  return fetch(
      `${API_BASE_URL}/users/${userId}/workouts/${workoutId}`,
      fetchOptions('DELETE', null)
    )
    .then(res => normalizeRes(res))
    .then(() => {
      dispatch(getProfile(userId));
      dispatch(workoutSuccess());
    })
    .catch(err => {
      console.error('WORKOUT Delete ERROR ==>', err);
      dispatch(workoutError(err));
      return err;
    })
}