import {
  EXERCISE_REQUEST, 
  EXERCISE_SUCCESS, 
  EXERCISE_ERROR,
  EXERCISE_CLEAR_ERROR
} from './exercise-actions';

const initialState = {
  error: '',
  loading: false
};

const exerciseReducer = (state = initialState, action) => {
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

export default exerciseReducer;