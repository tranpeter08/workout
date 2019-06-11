import React from 'react';
import {Field} from 'redux-form';
import UserInput from '../components/UserInput';
import HeightFields from '../components/HeightFields';
import WeightFields from '../components/WeightFields';
import {parseInput} from '../../misc/utils';

export default function UserInputs({heightUnitValue}) {
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}