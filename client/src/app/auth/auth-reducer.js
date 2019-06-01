import {
  AUTH_REQUEST,
  AUTH_SET,
  AUTH_CLEAR,
  AUTH_SUCCESS,
  AUTH_ERROR
  } from './auth-actions';

const initialState = {
  username: null,
  userId: null,
  loading: false,
  error: null,
  token: null,
};

const authReducer = (state = initialState, action) => {
  const {username, userId, error, token} = action;
  switch(action.type){
    case AUTH_REQUEST:
      return {...state, loading: true};
    case AUTH_SET:
      return {...state, token};
    case AUTH_CLEAR:
      return {...state, token: null, username: null, userId: null}
    case AUTH_SUCCESS:
      return {...state, username, userId, loading: false, error: null};
    case AUTH_ERROR:
      return {...state, error, loading: false}
    default:
      return state;
  }
}

export default authReducer;