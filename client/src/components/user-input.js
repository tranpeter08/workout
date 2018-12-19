import React, { Component } from 'react';

export default class UserInput extends Component {

  render() {
    // console.log('input props:',this.props)
    // props --> type, label
    const {input, label, type, meta: {touched, error}} = this.props

    return (
      <div>
        <label htmlFor="">{label}</label>
        <input 
          type={type}
          placeholder='something'
          {...input}
        />
        {label === 'Body Fat'? '%' :
          !label? 'in.' : null}
        {touched && error && <span className='validation-err'>{error}</span>}
      </div>
    )
  }
}