import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm} from 'redux-form';
import { Link, Redirect } from 'react-router-dom';
import UserInput from '../components/user-input';
import {required, notEmpty, isTrimmed} from '../validators';
import {logIn} from '../actions/auth';

export class Login extends Component {
  componentDidMount() {
    const input = document.getElementsByName('username')[0];
    if(input){
      input.focus();
    }
  }

  componentDidUpdate(prevProps) {
    const {error} = this.props.auth;
    if (!prevProps.auth.error && error) {
      if (error.location) {
        document.getElementsByName(error.location)[0].focus();
      }
    }
  };

  constructor(props){
    super(props);
    this.node = React.createRef();
  }

  onSubmit({username, password}) { 
    return this.props.dispatch(logIn(username, password))
  };

  render() {
    const {error, username, loading} = this.props.auth;

    if (username) { 
      return <Redirect to={`/user/${username}`} />
    }

    return (
      <div className={this.props.form} ref={this.node} >
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
            // disabled={this.props.pristine || this.props.submitting}
            type='submit'
          >Submit</button>
          <span>Not registered yet? Sign up <Link to="/register">here</Link></span>
        </form>
        <div>{error && <span>{error.message}</span>}</div>
      </div>
    );
  };
};

const mapStateToProps = ( {auth: {token, ..._auth}}, props) => ({auth: _auth});

export default connect(mapStateToProps)(reduxForm({
  form: 'logIn',
  initialValues: {
    'username': 'petertran',
    'password': '1234567890'
  }
  // onSubmitFail: () => {}
})(Login));