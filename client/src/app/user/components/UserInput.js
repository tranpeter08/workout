import React from 'react';

export default function UserInput({
  input,
  label,
  type,
  meta: {
    touched, 
    error
  }
}){

  return (
    <div className={'form-group'}>
      <label htmlFor={input.name}>{label}</label>
      <input
        className={'user-input-text'}
        id={input.name}
        type={type}
        {...input}
        min={0}
        max={input.name === 'bodyFat' ? 99 : 999}
      />
      {
        label === 'Body Fat' ? '%' :
        !label ? 'in.' : null
      }
      <small className='validation-err'>
        {touched && error && <span>{error}</span>}
      </small>
    </div>
  )
}