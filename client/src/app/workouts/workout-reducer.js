// import actions 
import {
  WORKOUT_REQUEST,
  WORKOUT_GET_SUCCESS,
  WORKOUT_SUCCESS, 
  WORKOUT_ERROR,
  WORKOUT_CLEAR_ERRORS
  } from './workout-actions';

const initialState = {
  workouts: '',
  loading: null,
  error: null
}
  
const workoutReducer = (state = initialState, action) => {
  switch(action.type){
    case WORKOUT_REQUEST:
      return {...state, loading: true}
    case WORKOUT_GET_SUCCESS:
      return {...state, workouts: action.workouts, loading: false, error: null}
    case WORKOUT_SUCCESS:
      return {...state, loading: false, error: null}
    case WORKOUT_ERROR:
      return {...state, loading: false, error: action.error}
    case WORKOUT_CLEAR_ERRORS:
      return {...state, error: null}
    default:
      return state;
  }
}

export default workoutReducer;