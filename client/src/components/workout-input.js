import React from 'react';

const WorkoutInput = (props) => {
  return (
    <div>
      <label htmlFor="">{props.label}</label>
      <input 
        type='text'
        {...props.input}
      />
    </div>
  )
};

export default WorkoutInput;