import {
  USER_REQUEST, 
  USER_SUCCESS,
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
    case USER_REQUEST:
      return {...state, loading: true};
    case USER_SUCCESS:
      return {...state, loading: false, error: '', profile};
    case USER_ERROR:
      return {...state, loading: false, error};
    default:
      return state;
  }
}

export default userReducer;