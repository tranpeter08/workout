import React, { Component } from 'react';

export default class UserInput extends Component {

  render() {
    // props --> type, label
    // console.log('input props', this.props)
    const {input, label, type, meta: {touched, error}} = this.props

    return (
      <div>
        <label htmlFor={input.name}>{label}</label>
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