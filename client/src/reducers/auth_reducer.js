import {
  AUTH_REQUEST,
  AUTH_SET,
  AUTH_SUCCESS,
  AUTH_ERROR
} from '../actions/auth'

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null
};

export const authReducer = (state = initialState, action) => {
  switch(action.type){
    case AUTH_REQUEST: //some action
      return {...state, loading: true}; //do something with action
    case AUTH_SET:
      return {...state, token: action.token};
    case AUTH_SUCCESS:
      return {...state, user: action.user, loading: false};
    case AUTH_ERROR:
      return {...state, error: action.error}
    default:
      return state;
  }
}
