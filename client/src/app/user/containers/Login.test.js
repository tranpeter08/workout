import React from 'react';
import {shallow, mount} from 'enzyme';
import ConnectedLogin, { Login } from './Login';
import {reduxForm} from 'redux-form';

describe('<Login />', () => {
  let wrapper;
  let Provider = () =>{}
  const props = {
    auth: { 
      error: '',
      username: '',
      loading: ''  
    },
    invalid: false,
    handleSubmit: jest.fn(),
    dispatch: jest.fn()
  };

  it('should render without crashing', ()=> {
    wrapper = shallow(
        <Login {...props}  />
    );
  });

  // it('calls onSubmit method when form is submitted', () => {
  //   let spy = jest.spyOn(Login.prototype, 'onSubmit');
  //   wrapper.simulate('submit');
  //   expect(spy).toHaveBeenCalled();
  // })
});