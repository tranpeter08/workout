import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Field, 
  reduxForm,
  formValueSelector
} from 'redux-form';
import {Redirect} from 'react-router-dom'
import UserInput from '../components/UserInput';
import { 
  required, 
  notEmpty,
  noSpaceInside, 
  usernameLength,
  passwordLength,
  matching, 
  isTrimmed,
} from '../validators';
import {createUser} from '../../auth/auth-actions';
import '../style/register.css';

import UserInputs from '../components/UserInputs';

export class Register extends Component {
  componentDidMount() {
    const inputs = document.getElementsByName('email');
    if(inputs.length > 0){
      inputs[0].focus();
    };
  };

  componentDidUpdate(prevProps) {
    const {error} = this.props.user;
    if (prevProps.user.error !== error) {
      if (error !==null && error.location) {
        const element = document.getElementsByName(error.location)[0]
        if (element) {
          element.focus();
        }
      }
    }
  }

  onSubmit(data) {
    if (data.heightUnit === 'cm' && data.inches) {
      delete data.inches;
    }
    const {username, password, email, ...profile} = data;

    return this.props.dispatch(createUser({
        username,
        password,
        email,
        profile
      }))
  };

  render() {
    const { 
      heightUnitValue, 
      handleSubmit,
      pristine,
      submitting,
      user: {error, loading, username}
    } = this.props;

    if (username) {
      return <Redirect to={`/user/${username}/workouts`} />
    }

    return (
      <main className='register-main'>
        <form
          id='register-form'
          onSubmit={handleSubmit((data) => this.onSubmit(data))}
        >
          <fieldset>
            <legend>Registration</legend>
            <div className='user-inputs-wrapper'>
              <Field
                name='email'
                label='Email'
                type='email'
                component={UserInput}
                validate={required}/>
              <Field
                name='username'
                label='Username'
                type='text'
                component={UserInput}
                validate={[
                  required, 
                  notEmpty,
                  isTrimmed,
                  noSpaceInside,
                  usernameLength
                ]}/>
              <Field 
                name='password'
                label='Password'
                type='password'
                component={UserInput}
                validate={[
                  required, 
                  notEmpty,
                  isTrimmed,
                  noSpaceInside,
                  passwordLength
                ]}/>
              <Field 
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                component={UserInput}
                validate={[required, matching]}/>
              <UserInputs heightUnitValue={heightUnitValue} />
            </div>
            <button 
              disabled={pristine || submitting || error}
            >
              Register
            </button>
          </fieldset>
          {
            error &&
            error.reason !== 'validationError' &&
            <small
              className='error'
            >
              * {error.message} at {error.location[0]}
            </small>
          }
          {loading && <span>Loading...</span>}
        </form>
      </main>
    );
  };
};

const selector = formValueSelector('register');

export const mapStateToProps = (state, props) => {
  const {auth: {username}, user: {loading, error}} = state;
  const heightUnitValue = selector(state, 'heightUnit');

  return {
    heightUnitValue, 
    user: { 
      username,
      loading,
      error
    }
  };
}

let ph = '1234567890';

export default connect(mapStateToProps)(reduxForm({
  form: 'register',
  initialValues: {
    username: '1234567890_', 
    email: 'peter@domain.com',
    password: ph,
    confirmPassword: ph
  }
})(Register));