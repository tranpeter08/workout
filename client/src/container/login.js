import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';

import UserInput from '../components/user-input';
import {required, notEmpty, isTrimmed} from '../validators';

import {logIn} from '../actions/auth';

export class Login extends Component {
  componentDidMount() {
    const inputs = document.getElementsByName('username');
    if(inputs.length > 0){
      inputs[0].focus();
    }
  }

  componentDidUpdate(prevProps) {
    const {error} = this.props.auth;
    // console.log('component update error ==>', error);
    if (error) {
      document.getElementsByName(error.location)[0].focus();
    }
  }

  onSubmit(data) {
    //submit user data to DB, update state with user logged in
    // action?

    // console.log('sign-in data:', data);
    
    return this.props.dispatch(logIn(data.username, data.password))
  };

  render() {
    // console.log('LOG IN props', this.props)
    const {error, user} = this.props.auth;
    if(user) { 
      return <Redirect to={`/user/${user.username}`} />
    }
    return (
      <div>
        <form 
          onSubmit={
            this.props.handleSubmit((values) => this.onSubmit(values))
        }>
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
            type='submit'
          >Submit</button>
          <span>Not registered yet? Sign up <Link to="/register">here</Link></span>
        </form>
        <div>{error && <span>{error.message}</span>}</div>
      </div>
    );
  };
};

const mapStateToProps = ( {auth}, props) => ({auth});

export default connect(mapStateToProps)(reduxForm({
  form: 'logIn'
})(Login));