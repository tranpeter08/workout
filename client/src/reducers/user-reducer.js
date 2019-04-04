import {USER_REQUEST, USER_SUCCESS, USER_ERROR} from '../actions/user';

const initialState = {
  loading: false,
  error: null
}

export const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_REQUEST:
      return {...state, loading: true};
    case USER_SUCCESS:
      return {...state, loading: false, error: false};
    case USER_ERROR:
      return {...state, loading: false, error: action.error};
    default:
      return state;
  }
}