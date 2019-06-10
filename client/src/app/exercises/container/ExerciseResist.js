import React from 'react';
import {Field} from 'redux-form';
// label input select 

export default function ExerciseResist(props) {
  // containerclass
  return (
    <div className='exerciseForm-group'>
      <label htmlFor='resistance' >Resistance</label>
      <Field
        name='resistance'
        type='text'
        id='resistance'
        className='resistance'
        component='input'
      />
      <Field 
        aria-label='Resistance Unit'
        name='resistUnit' 
        className='resistUnit' 
        component='select'
      >
        <option value="lb">lb</option>
        <option value="kg">kg</option>
        <option value="other">other</option>
      </Field>
    </div>
  )
}