import * as userActions from './user-actions';

describe('user-actions', () => {
  describe('userRequest action creator', () => {
    const {userRequest, USER_REQUEST} = userActions;
    const USERS_REQUEST = 'USERS_REQUEST';

    it('returns the correct string for action USER_REQUEST', () => {
      expect(USER_REQUEST).not.toEqual('USER_REQUESt');
      expect(USER_REQUEST).toEqual('USER_REQUEST');
    });

    it('returns the correct object for userRequest', () => {
      expect(userRequest()).not.toEqual({type: USERS_REQUEST})
      expect(userRequest()).toEqual({type: USER_REQUEST})
    });
  });

  describe('userSuccess action creator', () => {
    const {userSuccess, USER_SUCCESS} = userActions;
    const USERS_SUCCESS = 'USERS_SUCCESS';
    const profile = {username: 'test'};

    it('returns the correct string for action USER_SUCCESS', () => {
      expect(USER_SUCCESS).not.toEqual(USERS_SUCCESS);
      expect(USER_SUCCESS).toEqual('USER_SUCCESS');
    });

    it('returns the correct object for userRequest', () => {
      expect(userSuccess()).not.toEqual({type: USER_SUCCESS, username: ''});
      expect(userSuccess()).toEqual({type: USER_SUCCESS});
      expect(userSuccess(profile)).not.toEqual({type: USER_SUCCESS, username: 'test'});
      expect(userSuccess(profile)).toEqual({type: USER_SUCCESS, profile});
    });
  });

  describe('userClear action creator', () => {
    const {userClear, USER_CLEAR} = userActions;
    const USERS_CLEAR = 'USERS_CLEAR';

    it('returns the correct string for action USER_CLEAR', () => {
      expect(USER_CLEAR).not.toEqual(USERS_CLEAR);
      expect(USER_CLEAR).toEqual('USER_CLEAR');
    });

    it('returns the correct object for userRequest', () => {
      expect(userClear()).not.toEqual({type: USERS_CLEAR});
      expect(userClear()).toEqual({type: USER_CLEAR});
    });
  }); 

  describe('userError action creator', () => {
    const {userError, USER_ERROR} = userActions;
    const USERS_ERROR = 'USERS_ERROR';
    const error = {message: 'test message', code: 400};
    const _object = {type: USERS_ERROR, error: 'test'}


    it('returns the correct string for action USER_ERROR', () => {
      expect(USER_ERROR).not.toEqual(USERS_ERROR);
      expect(USER_ERROR).toEqual('USER_ERROR');
    });

    it('returns the correct object for userRequest', () => {
      expect(userError()).not.toEqual(_object);
      expect(userError()).toEqual({type: USER_ERROR});
      expect(userError(error)).not.toEqual(_object);
      expect(userError(error)).toEqual({type: USER_ERROR, error})
    });
  }); 
});