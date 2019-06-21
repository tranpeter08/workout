import {authSuccess} from './auth-actions';

import reducer from './auth-reducer';

const initialState = {
  username: '',
  userId: '',
  loading: false,
  error: '',
  token: '',
};

describe('authReducer', ()=> {
  it('should return the correct initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  it('should return the correct state on AUTH_REQUEST', () => {
    let username='test',
      userId='1234567890';

    let updatedState = {...initialState, username, userId}

    expect(reducer(undefined, authSuccess('hello', '54321')))
      .not.toEqual({updatedState});

    expect(reducer(undefined, authSuccess(username, userId)))
      .toEqual(updatedState);
  });
});