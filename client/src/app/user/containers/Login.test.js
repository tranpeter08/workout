import React from 'react';
import {shallow, mount} from 'enzyme';
import ConnectedLogin, { Login } from './Login';
import {logIn} from '../../auth/auth-actions';
import {Provider} from 'react-redux'
import {reduxForm} from 'redux-form';

describe('<Login />', () => {
  let wrapper;
  const mockLoginAction = {type: 'AUTH_REQUEST'};

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
    wrapper = shallow(
      <Login {...props} />
    );
  });

  // it('calls onSubmit method when form is submitted', () => {
  //   let instance = wrapper.instance();
  //   let username = 'hello123',
  //     password = 'person123';
  //   instance.onSubmit(username, password);
// 
    // wrapper.simulate('submit');
    // expect(props.handleSubmit).toHaveBeenCalledWith(spy);
    // expect(props.dispatch).toHaveBeenCalledWith(logIn(username, password));
  // })
});