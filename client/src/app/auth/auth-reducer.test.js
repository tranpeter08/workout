import {authSuccess} from './auth-actions';

import reducer from './auth-reducer';

describe('authReducer', ()=> {
  it('should return the right initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      username: null,
      userId: null,
      loading: false,
      error: null,
      token: null,
    })
  })

  it('should return the correct state on AUTH_REQUEST', () => {
    expect(reducer(undefined, authSuccess('test', '123456'))).not.toBe({
      username: 'tes',
      userId: '12345',
      loading: false,
      error: null,
      token: null,
    })
  })

})