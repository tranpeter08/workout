'use strict';
import React from 'react';
import {shallow, mount} from 'enzyme';
import { Login} from './Login';

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
    const wrapper = shallow(<Login {...props} />);
    let username = 'hello123',
    password = 'person123',
    instance = wrapper.instance();
    
    instance.onSubmit(username, password);
    expect(props.dispatch).toHaveBeenCalled();
  })
});