import React, {Component} from 'react';

export default class ExcerciseInput extends Component {
  render() {
    const {label, type, input, className} = this.props;
    const classString = className ? 
      `exerciseForm-group ${className}` : 'exerciseForm-group';
    return(
      <div className={classString}>
        <label htmlFor={input.name}>
          { label ? `${label}: `: null }
        </label>
        {
          label === 'Notes' ? 
            <textarea  {...input} /> 
            :
            <input type={type} id={input.name}{...input}/>
        }
        
      </div>
    )
  }
}