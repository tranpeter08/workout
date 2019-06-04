import React from 'react';
import {Field} from 'redux-form';
import UserInput from '../components/UserInput';
import HeightFields from '../components/HeightFields';
import WeightFields from '../components/WeightFields';
import { 
  required, 
  notEmpty,
  noSpaceInside, 
  usernameLength,
  passwordLength,
  matching, 
  isTrimmed,
} from '../validators';
import {parseInput} from '../../misc/utils';

export default function UserInputs({heightUnitValue}) {
  return (
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
      <Field 
        name='firstName'
        label='First Name'
        type='text'
        component={UserInput}/>
      <Field 
        name='lastName'
        label='Last Name'
        type='text'
        component={UserInput}/>
      <HeightFields heightUnitValue={heightUnitValue} />
      <WeightFields />
      <Field 
        name='bodyFat'
        label='Body Fat'
        type='number'
        parse={parseInput}
        component={UserInput}/>
    </div>
  )
}