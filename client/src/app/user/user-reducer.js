import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  USER_ERROR
} from './user-actions';

const initialState = {
  loading: false,
  error: '',
  profile: ''
}

const userReducer = (state = initialState, action) => {
  const {profile, error} = action;

  switch(action.type) {
    case GET_PROFILE_REQUEST:
      return {...state, loading: true};
    case GET_PROFILE_SUCCESS:
      return {...state, loading: false, error: '', profile};
    case UPDATE_PROFILE_REQUEST:
      return {...state, loading: true};
    case UPDATE_PROFILE_SUCCESS:
      return {...state,loading: true, error: ''};
    case USER_ERROR:
      return {...state, loading: false, error};
    default:
      return state;
  };
}

export default userReducer;