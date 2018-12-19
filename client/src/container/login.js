import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import UserInput from '../components/user-input';
import {required, notEmpty, isTrimmed} from '../validators';

export class Login extends Component {
  onSubmit(data) {
    //submit user data to DB, update state with user logged in
    console.log('sign-in data:', data);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit((values) => this.onSubmit(values))}>
        <Field 
          name='username'
          label='Username'
          type='text'
          component={UserInput}
          validate={[required, isTrimmed]}
        />
        <Field 
          name='password'
          label='Password'
          type='password'
          component={UserInput}
          validate={[required, isTrimmed]}
        />
        
        <button
          disabled={this.props.pristine || this.props.submitting}
        >Submit</button>
        <span>Not registered yet? Sign up <Link to="/register">here</Link></span>
      </form>
    )
  };
};

export default reduxForm({
  form: 'logIn'
})(Login);