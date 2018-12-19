import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import UserInput from '../components/user-input';
import Select from  '../components/select';
import { 
  required, 
  notEmpty, 
  length, 
  matching, 
  isTrimmed,
  selected
} from '../validators';
import validate from '../validate';

export class Register extends Component {
  onSubmit(data) {
    //submit user data to DB, update state with user logged in
    //redirect to user page on success
    console.log('register data:', data);
  };

  render() {
    console.log('register props:',this.props)
    const { 
      heightValue, 
      heightUnitValue,
      weightValue, 
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
      <form action="" onSubmit={handleSubmit((values) => this.onSubmit(values))}>
        <Field 
          name='firstName'
          label='First Name'
          type='text'
          component={UserInput}
          validate={[notEmpty, isTrimmed]}
        />
        <Field 
          name='lastName'
          label='Last Name'
          type='text'
          component={UserInput}
          validate={[required, notEmpty, isTrimmed]}
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
          validate={selected(heightValue)}
        />
        { heightUnitValue === 'ft'? inches : null}
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
          validate={selected(weightValue)}
        />
        <Field 
          name='bodyFat'
          label='Body Fat'
          type='number'
          component={UserInput}
        />
        <Field 
          name='username'
          label='Username'
          type='text'
          component={UserInput}
          validate={[required, notEmpty, length({min:8}), isTrimmed]}
        />
        <Field 
          name='password'
          label='Password'
          type='password'
          component={UserInput}
          validate={[required, notEmpty, isTrimmed, length({min:12, max:72})]}
        />
        <Field 
          name='confirmPassword'
          label='Confirm Password'
          type='password'
          component={UserInput}
          validate={[required, notEmpty, isTrimmed, matching('password')]}
        />
        <button disabled={pristine || submitting}>Submit</button>
      </form>
    );
  };
};

const selector = formValueSelector('register');

const mapStateToProps = (state, props) => {
  const heightValue = selector(state, 'height');
  const heightUnitValue = selector(state, 'heightUnit');
  const weightValue = selector(state, 'weight')
  return {heightValue, heightUnitValue, weightValue};
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