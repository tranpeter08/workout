import {authSuccess} from './auth-actions';

import reducer from './auth-reducer';

const initialState = {
  username: null,
  userId: null,
  loading: false,
  error: null,
  token: null,
};

describe('authReducer', ()=> {
  it('should return the correct initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  it('should return the correct state on AUTH_REQUEST', () => {
    let username='test',
      password='1234567890';

    let updatedState = {...initialState, username, password}

    expect(reducer(undefined, authSuccess('hello', '54321')))
      .not.toBe({updatedState});

    expect(reducer(undefined, authSuccess(username, password)))
      .toBe(updatedState);
  });

})