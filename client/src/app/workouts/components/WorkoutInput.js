import React from 'react';

class WorkoutInput extends React.Component{
  componentDidMount(){
    this.inputField.current.focus()
  }

  constructor() {
    super();
    this.inputField = React.createRef();
  }

  render() {
    const {input, meta: {touched, error}} = this.props;
    return (
      <div>
        <input 
          type='text'
          {...input}
          ref={this.inputField}
        />
        {
          touched && 
          error && 
          <span>{error || 'Something went wrong'}</span>
        }
      </div>
    )
  }
};

export default WorkoutInput;