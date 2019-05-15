import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Field, 
  reduxForm,
  formValueSelector
} from 'redux-form';
import {Redirect} from 'react-router-dom'

import UserInput from '../components/user-input';
import Select from  '../components/select';
import { 
  required, 
  notEmpty,
  noSpaceInside, 
  length,
  matching, 
  isTrimmed,
} from '../validators';
import {parseInput} from '../utils';

import {createUser} from '../actions/user';

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
    if(data.heightUnit === 'cm' && data.inches) {
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

  handleFocusErr = () => {

  }

  render() {
    console.log(this.props)
    const { 
      heightUnitValue, 
      handleSubmit,
      pristine,
      submitting,
      user: {error, loading}
    } = this.props;

    // if (username) {
    //   return <Redirect to={`/user/${username}`} />
    // }

    return (
      <div>
        <form 
          action="" 
          onSubmit={handleSubmit((data) => this.onSubmit(data))}
        >
          <Field
            name='email'
            label='Email'
            type='email'
            component={UserInput}
            validate={required}
            />
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
              length(8,20),
            ]}
          />
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
              length(10),
            ]}
          />
          <Field 
            name='confirmPassword'
            label='Confirm Password'
            type='password'
            component={UserInput}
            validate={[required, matching]}
          />
          <Field 
            name='firstName'
            label='First Name'
            type='text'
            component={UserInput}
          />
          <Field 
            name='lastName'
            label='Last Name'
            type='text'
            component={UserInput}
          />
          <Field 
            name='height'
            label='Height'
            type='number'
            parse={parseInput}
            component={UserInput}
          />
          <Field
            name='heightUnit'
            options={['ft', 'cm']}
            component={Select}
          />
          { heightUnitValue === 'cm'? null :
            <Field 
              name='inches'
              type='number'
              parse={parseInput}
              component={UserInput}
            /> 
          }
          <Field 
            name='weight'
            label='Weight'
            type='number'
            parse={parseInput}
            component={UserInput}
          />
          <Field
            name='weightUnit'
            options={['lb', 'kg']}
            component={Select}
          />
          <Field 
            name='bodyFat'
            label='Body Fat'
            type='number'
            parse={parseInput}
            component={UserInput}
          />
          <button disabled={pristine || submitting}>Submit</button>
        </form>
        {error && <span>{error.message}</span>}
        {loading && <span>Loading...</span>}
      </div>
    );
  };
};

const selector = formValueSelector('register');

const mapStateToProps = (state, props) => {
  const {auth, user} = state;
  const heightUnitValue = selector(state, 'heightUnit');
  return {
    heightUnitValue, 
    user: { 
      username: auth.username,
      loading: user.loading,
      error: user.error
    }
  };
}

const ph = '1234567890';

export default connect(mapStateToProps)(reduxForm({
  form: 'register',
  initialValues: {
    username: '1234567890_', 
    email: 'peter@domain.com',
    password: ph,
    confirmPassword: ph
  }
})(Register));