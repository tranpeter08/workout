import {
  USER_REQUEST, 
  USER_SUCCESS, 
  USER_CLEAR,
  USER_ERROR} from '../actions/user';

const initialState = {
  loading: false,
  error: null,
  profile: null
}

export const userReducer = (state = initialState, action) => {
  const {profile, error} = action;
  switch(action.type) {
    case USER_REQUEST:
      return {...state, loading: true};
    case USER_SUCCESS:
      return {...state, loading: false, error: null, profile};
    case USER_CLEAR:
      return {...state, profile: null};
    case USER_ERROR:
      return {...state, loading: false, error};
    default:
      return state;
  }
}