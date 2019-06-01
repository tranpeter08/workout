import React, { Component } from 'react';

export default class Select extends Component {
  render() {
    const {meta: {touched, error}, options, label} = this.props;
    
    const optionList = options.map( 
      option => <option key={option} value={option}>{option}</option> 
    )

    return (
      <div className='select-unit inline'>
        <select aria-label={label} {...this.props.input}>
          {optionList}
        </select>
        {touched && error && <small>{error}</small>}
      </div>
    )
  }
}