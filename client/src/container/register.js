import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import UserInput from '../components/user-input';
import Select from  '../components/select';
import { 
  required, 
  notEmpty,
  noSpaceInside, 
  length,
  matching, 
  isTrimmed,
  selected
} from '../validators';

import {createUser} from '../actions/user'
import {logIn} from '../actions/auth'

export class Register extends Component {
  onSubmit(data) {
    console.log('register data:', data);
    const {username, password, email, ...profile} = data;
    return this.props.dispatch(createUser({
        username,
        password,
        email,
        profile
      }))
      .then(() => this.props.dispatch(logIn(username, password)))
  };

  render() {
    // console.log('register props:',this.props)
    const { 
      heightUnitValue, 
      handleSubmit,
      pristine,
      submitting 
    } = this.props; 

    const inches = <Field 
      name='inches'
      type='text'
      component={UserInput}
    />

    return (
      <form 
        action="" 
        onSubmit={handleSubmit((data) => this.onSubmit(data))}
      >
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
            validate={[required, matching('password')]}
          />
          <Field
          name='email'
          label='Email'
          type='email'
          component={UserInput}
          validate={required}
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
            component={UserInput}
          />
          <Field
            name='heightUnit'
            options={['ft', 'cm']}
            component={Select}
            validate={selected('height')}
          />
          { heightUnitValue === 'ft'? inches : null }
          <Field 
            name='weight'
            label='Weight'
            type='number'
            component={UserInput}
          />
          <Field
            name='weightUnit'
            options={['lb', 'kg']}
            component={Select}
            validate={selected('weight')}
          />
          <Field 
            name='bodyFat'
            label='Body Fat'
            type='number'
            component={UserInput}
          />
          <button disabled={pristine || submitting}>Submit</button>
      </form>
    );
  };
};

const selector = formValueSelector('register');

const mapStateToProps = (state, props) => {
  const heightUnitValue = selector(state, 'heightUnit');
  return {heightUnitValue};
}

const initialValues = {
  weightUnit: 'lb',
  heightUnit: 'ft'
}

export default connect(mapStateToProps)(reduxForm({
  form: 'register',
  // initialValues
  // validate
})(Register));