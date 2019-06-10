import React from 'react';
import '../styling/workoutInput.css'

class WorkoutInput extends React.Component{
  componentDidMount(){
    this.inputField.current.focus()
  }

  constructor() {
    super();
    this.inputField = React.createRef();
  }

  render() {
    const {input, label, meta: {touched, error}} = this.props;
    return (
      <div className='workout-formGroup'>
        <label htmlFor={input.name}>{label}</label><br/>
        <input 
          aria-label='Workout Name'
          type='text'
          {...input}
          ref={this.inputField}
        />
        {
          touched && 
          error && 
          <span>{error || error.message}</span>
        }
      </div>
    )
  }
};

export default WorkoutInput;