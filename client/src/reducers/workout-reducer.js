// import actions 
import {
  WORKOUT_REQUEST, 
  WORKOUT_SUCCESS, 
  WORKOUT_ERROR,
  WORKOUT_CLEAR_ERRORS
  } from '../actions/workout-actions';

const initialState = {
  loading: null,
  error: null
}
  
const workoutReducer = (state = initialState, action) => {
  switch(action.type){
    case WORKOUT_REQUEST:
      return {...state, loading: true}
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