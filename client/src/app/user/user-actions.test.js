import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  userRequest, userSuccess, userError,
  getProfile, updateProfile,
  USER_REQUEST, USER_SUCCESS, USER_ERROR
} from './user-actions';
import {API_BASE_URL} from '../misc/config';
import {fetchOptions} from '../misc/utils';

describe('user-actions', () => {
  describe('userRequest action creator', () => {
    const USERS_REQUEST = 'USERS_REQUEST';

    it('returns the correct string for action USER_REQUEST', () => {
      expect(USER_REQUEST).not.toEqual('USER_REQUESt');
      expect(USER_REQUEST).toEqual('USER_REQUEST');
    });

    it('returns the correct action for userRequest', () => {
      expect(userRequest()).not.toEqual({type: USERS_REQUEST});
      expect(userRequest()).toEqual({type: USER_REQUEST});
    });
  });

  describe('userSuccess action creator', () => {
    const USERS_SUCCESS = 'USERS_SUCCESS';
    const profile = {username: 'test'};

    it('returns the correct string for action USER_SUCCESS', () => {
      expect(USER_SUCCESS).not.toEqual(USERS_SUCCESS);
      expect(USER_SUCCESS).toEqual('USER_SUCCESS');
    });

    it('returns the correct action for userRequest', () => {
      expect(userSuccess()).not.toEqual({type: USER_SUCCESS, username: ''});
      expect(userSuccess()).toEqual({type: USER_SUCCESS});
      expect(userSuccess(profile)).not.toEqual({type: USER_SUCCESS, username: 'test'});
      expect(userSuccess(profile)).toEqual({type: USER_SUCCESS, profile});
    });
  });

  describe('userError action creator', () => {
    const USERS_ERROR = 'USERS_ERROR';
    const error = {message: 'test message', code: 400};
    const _object = {type: USERS_ERROR, error: 'test'};


    it('returns the correct string for action USER_ERROR', () => {
      expect(USER_ERROR).not.toEqual(USERS_ERROR);
      expect(USER_ERROR).toEqual('USER_ERROR');
    });

    it('returns the correct action for userRequest', () => {
      expect(userError()).not.toEqual(_object);
      expect(userError()).toEqual({type: USER_ERROR});
      expect(userError(error)).not.toEqual(_object);
      expect(userError(error)).toEqual({type: USER_ERROR, error});
    });
  });

  describe('async actions', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const userId = 'fakeId1234'
    
    describe('getProfile action creator', () => {
      const profile = {firstname: 'test1', lastName: 'test2'};
      const store = mockStore({auth: {userId}, users: ''});
      beforeEach(() => {
        fetch.resetMocks();
        store.clearActions();
      })

      it('returns the correct actions on successful fetch request', () => {
        fetch.mockResponse(JSON.stringify(profile));
        // fetchMock.post(`${API_BASE_URL}/users`, {body: newUser});

        const expectedActions = [
          {type: USER_REQUEST},
          {type: USER_SUCCESS, profile}
        ];
  
        return (
          store.dispatch(getProfile())
            .then(()=> {
              expect(fetch).toHaveBeenCalled();

              const fetchArgs = fetch.mock.calls[0];

              expect(fetchArgs[0])
                .not.toEqual(`${API_BASE_URL}/user/profile/0001`);
              expect(fetchArgs[0])
                .toEqual(`${API_BASE_URL}/users/profile/${userId}`);
              expect(fetchArgs[1])
                .not.toEqual(fetchOptions('POST'));
              expect(fetchArgs[1]).toEqual(fetchOptions('GET'));

              expect(store.getActions()).not.toEqual([]);
              expect(store.getActions()).toEqual(expectedActions);
            })
        );
      });

      it('returns the correct actions on a failed fetch request', () => {
        const error = {message: 'mock error'};
  
        fetch.mockReject(error);
  
        const expectedActions = [
          {type: USER_REQUEST},
          {type: USER_ERROR, error}
        ];

        const wrongActions = [
          {type: USER_REQUEST},
          {type: USER_SUCCESS, profile: error}
        ];
  
        return store.dispatch(getProfile())
          .then(() => {
            expect(store.getActions()).not.toEqual(wrongActions);
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    describe('updateProfile action creator', () => {
      const profile = {firstName: 'test1', lastName: 'test2'};
      const newProfile = {firstName: 'testA', lastName: 'testB'};
      const store = mockStore({
        auth: {userId},
        users: profile
      });

      beforeEach(() => {
        fetch.resetMocks();
        store.clearActions();
      });

      it('returns the correct actions on successful fetch request', () => {
        fetch.mockResponse(JSON.stringify(newProfile));

        const expectedActions = [
          {type: USER_REQUEST},
          {type: USER_REQUEST},
          {type: USER_SUCCESS, profile: newProfile}
        ];

        const wrongActions = [
          {type: USER_REQUEST},
          {type: USER_REQUEST},
          {type: USER_SUCCESS, profile}
        ];

        return store.dispatch(updateProfile(newProfile))
          .then(() => {
            expect(fetch).toHaveBeenCalled();

            const fetchArgs = fetch.mock.calls[0];

            expect(fetchArgs[0])
              .not.toEqual(`${API_BASE_URL}/user/profile/${userId}`);
            expect(fetchArgs[0])
              .toEqual(`${API_BASE_URL}/users/profile/${userId}`);
            expect(fetchArgs[1]).not.toEqual(fetchOptions('POST', newProfile));
            expect(fetchArgs[1]).toEqual(fetchOptions('PUT', newProfile));

            expect(store.getActions()).not.toEqual(wrongActions);
            expect(store.getActions()).toEqual(expectedActions);
          });
      });

      it('returns the correct actions on a failed fetch request', () => {
        const error = {message: 'fake error message'};

        fetch.mockReject(error);

        const expectedActions = [
          {type: USER_REQUEST},
          {type: USER_ERROR, error}
        ];

        const wrongActions = [
          {type: USER_REQUEST},
          {type: USER_REQUEST},
          {type: USER_SUCCESS, profile: error}
        ];

        return store.dispatch(updateProfile(newProfile))
          .then(() => {

            expect(store.getActions()).not.toEqual(wrongActions);  
            expect(store.getActions()).toEqual(expectedActions);
          })
      });
    });
  });
});