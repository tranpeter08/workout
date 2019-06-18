'use strict';
import React from 'react';
import {shallow, mount} from 'enzyme';
import { Login} from './Login';
import {logIn} from '../../auth/auth-actions';

describe('<Login />', () => {
  let username = 'test',
  password='1234567890'
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
    let wrapper = shallow(<Login {...props} />),
    username = 'hello123',
    password = 'person123',
    instance = wrapper.instance();

    instance.onSubmit({username, password});
    expect(props.dispatch).toHaveBeenCalledWith(logIn(username, password));
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