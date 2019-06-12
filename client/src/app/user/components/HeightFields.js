import React from 'react';
import {Field} from 'redux-form';
import Select from './Select';
import {parseInput} from '../../misc/utils'
import '../style/heightFields.css';

export default function HeightFields({heightUnitValue}) {
  return (
    <div className='form-group' id='heightFields'>
      <label htmlFor='height'>Height</label>
      <Field 
        component='input'
        id='height'
        className='height-input inline' 
        name='height' 
        type='number'
        min={0}
        max={ heightUnitValue === 'ft' ? 10 : 300}
        parse={parseInput}
      />
      <Field 
        name='heightUnit'
        options={['ft', 'cm']}
        component={Select}
        label='Height Unit'
      />
      {
        heightUnitValue === 'cm' ? null :
          <span className='inches-span'>
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