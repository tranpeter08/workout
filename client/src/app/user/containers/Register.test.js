import React from 'react';
import {shallow} from 'enzyme';
import {Register, mapStateToProps} from './Register';

describe('<Register />', () => {
  let props,
    wrapper,
    dispatch = jest.fn();

  beforeAll(() => {
    props = { 
      heightUnitValue: '', 
      handleSubmit: jest.fn(),
      pristine: true,
      submitting: false,
      user: {
        error: '', 
        loading: false, 
        username: ''
      }
      
    }

    wrapper = shallow(<Register dispatch={dispatch} {...props} />)
  });

  
  it('renders without crashing', () => {
    shallow(<Register {...props}/>)
  });

  it('dispatches createUser when onSubmit is called', () => {
    let data = {};
    wrapper.instance().onSubmit(data);
    // how to test dispatch with an action creator passed as an argument?
    // expect(dispatch).toHaveBeenCalledWith(createUser(data));
    expect(dispatch).toHaveBeenCalled();
  });

  it('redirects once a user is logged in', () => {
    let username = 'tester',
    newProps = {
      user : {
        username,
        error: '',
        loading: false
    }};

    wrapper.setProps(newProps);
    expect(wrapper.exists('.register-main')).toBe(false);
  });

  it('displays an error if there is an error', () => {
    let error = {
      message: 'test message',
      location: ['Field 1'],
      reason: 'serverError'
    },
    newProps = {
      user: {
        error,
        username: '',
        loading: false
      }
    },
    _errorMessage = `* ${error.message} at ${error.location[0]}`;

    expect(wrapper.exists('.error')).toBe(false);

    wrapper.setProps(newProps);

    let errorMessage = wrapper.find('.error');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toEqual(_errorMessage);
  });

  it('maps the correct props from store', () => {

    const mockState = {
      auth: {
        username: 'tester',
      },
      user: {
        loading: false,
        error: ''
      }
    };

    const {auth: {username}, user: {loading, error}} = mockState;

    const _mappedProps = {
      heightUnitValue: undefined,
      user: {
        username,
        loading,
        error
      }
    }

    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(_mappedProps);
  });
});