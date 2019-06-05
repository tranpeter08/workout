import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';
import UserInput from '../components/UserInput';
import {required, isTrimmed} from '../validators';
import {logIn} from '../../auth/auth-actions';
import '../style/login.css';

export class Login extends Component {
  constructor(props){
    super(props);
  };

  componentDidMount() {
    const input = document.getElementsByName('username')[0];
    if (input) {
      input.focus();
    }
  };

  componentDidUpdate(prevProps) {
    const {error} = this.props.auth;
    if (prevProps.auth.error !== error) {
      if (error.location) {
        document.getElementsByName(error.location)[0].focus();
      };
    };
  };

  onSubmit({username, password}) { 
    return this.props.dispatch(logIn(username, password))
  };

  handleFocusError = error => {
    document.getElementsByName(error.location)[0].focus();
  };

  render() {
    const {
      auth: {
        error, 
        username, 
        loading
      }, 
      invalid,
      handleSubmit,
      submitting
    } = this.props;

    if (username) { 
      return <Redirect to={`/user/${username}/workouts`} />
    }

    return (
      <main className='login-main'>
        <form 
          id='login-form'
          onSubmit={
            handleSubmit((values) => this.onSubmit(values))
          }
        >
          <h2>Login</h2>
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
              disabled={submitting}
              type='submit'
            >
              Login
            </button>   
            <p className='message'>
              Not registered yet?<br/><Link to="/register">Sign up!</Link>
            </p> 
            {
              invalid && 
              error && 
              error.reason !== 'LoginError' && 
              <div>
                <small className='error'>* {error.message}</small>
              </div>
            }
        </form>
      </main>
    );
  };
};

export const mapStateToProps = ( state, props) => {
  const {auth: {token, ..._auth}} = state;
  return ({auth: _auth})
};

export const FormLogin = reduxForm({
  form: 'logIn',
  initialValues: {
    'username': 'petertran',
    'password': '1234567890'
  }
})(Login);

export default connect(mapStateToProps)(FormLogin);