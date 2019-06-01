import React from 'react';
import {Field} from 'redux-form';
import Select from './Select';
import {parseInput} from '../../misc/utils'

export default function HeightFields(props) {
  return (
    <div className='form-group'>
      <label htmlFor='height'>Height</label>
      <Field 
        component='input'
        id='height'
        className='height-input inline' 
        name='height' 
        type='number'
        min={0}
        max={10}
        parse={parseInput}
      />
      <Field 
        name='heightUnit'
        options={['ft', 'cm']}
        component={Select}
        label='Height Unit'
      />
      {
        props.heightUnitValue === 'cm' ? null :
          <span>
            <Field
              component='input'
              name='inches' 
              id='inches'
              className='height-input inline' 
              type='number'
              min={0}
              max={11}
              parse={parseInput}
            /><label className='inline' htmlFor='inches'>in.</label>
          </span>
      }
    </div>
  )
}