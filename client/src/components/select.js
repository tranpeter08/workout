import React, { Component } from 'react';

export default class Select extends Component {
  render() {
    // console.log('select props:', this.props);
    //props --> options:[]; 
    const {meta: {touched, error}, options} = this.props;
    
    const optionList = options.map( 
      option => <option key={option} value={option}>{option}</option> 
    )

    return (
      <div>
        <select {...this.props.input}>
          {optionList}
        </select>
        {touched && error && <span>{error}</span>}
      </div>
    )
  }
}