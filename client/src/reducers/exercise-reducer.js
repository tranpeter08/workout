import {
  EXERCISE_REQUEST, 
  EXERCISE_SUCCESS, 
  EXERCISE_ERROR,
  EXERCISE_CLEAR_ERROR
} from '../actions/exercise-actions';

const initialState = {
  error: null,
  loading: false
};

export const exerciseReducer = (state = initialState, action) => {
  switch(action.type){
  case EXERCISE_REQUEST:
    return {...state, loading: true};
  case EXERCISE_SUCCESS:
    return {...state, loading: false, error: null};
  case EXERCISE_ERROR:
    return {...state, loading: false, error: action.error};
  case EXERCISE_CLEAR_ERROR:
    return {...state, error: null};
  default:
    return state;
  }
}