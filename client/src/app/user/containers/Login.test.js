'use strict';
import React from 'react';
import {shallow, mount} from 'enzyme';
import { Login} from './Login';
import {logIn} from '../../auth/auth-actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {AUTH_REQUEST} from '../../auth/auth-actions';

describe('<Login />', () => {
  const props = {
    auth: {
      error: '',
      username: '',
      loading: ''
    },
    handleSubmit: jest.fn(),
    dispatch: jest.fn(),
    invalid: false
  };

  it('should render without crashing', ()=> {
      shallow(<Login {...props} />);
  });

  it('onSubmit dispatches', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({auth: {loading: '', error: '', username: ''}})
    let wrapper = shallow(<Login {...props} dispatch={store.dispatch} />),
    username = 'hello123',
    password = 'person123',
    instance = wrapper.instance();

    const expectedActions = [
      {type: AUTH_REQUEST}
    ];
    
    instance.onSubmit({username, password});
    expect(store.getActions()).toEqual(expectedActions);
    // expect(props.dispatch).toHaveBeenCalledWith(logIn(username, password));
    // check instead for authRuquest action
  })

  it('displays the error if there is an error', () => {
    const wrapper = shallow(<Login {...props} />);
    expect(wrapper.exists('.error')).toBe(false);
    
    const authErr = {
      auth: {
        error: {
          message: 'test error message'
        }
      },
      invalid: true
    };

    wrapper.setProps(authErr);
    expect(wrapper.exists('.error')).toBe(true);

    let errorMessage = wrapper.find('.error');
    expect(errorMessage.text().includes(authErr.auth.error.message)).toBe(true);

  })
});