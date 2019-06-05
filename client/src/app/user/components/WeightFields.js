import React from 'react';
import {Field} from 'redux-form';
import Select from './Select';
import {parseInput} from '../../misc/utils';

export default function WeightFields(props) {
  return(
    <div className='form-group'>
      <label htmlFor='weight'>Weight</label>
      <Field
        name='weight'
        id='weight'
        type='number'
        component='input'
        min={0}
        parse={parseInput} />
      <Field
        name='weightUnit'
        options={['lb', 'kg']}
        component={Select}
        label='Weight Unit' />
    </div>
  )
}