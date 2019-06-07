import React, { Component} from 'react';
import ExerciseForm from '../container/ExerciseForm';
import '../style/exerciseAdd.css';

export default class ExerciseAdd extends Component {
  constructor(props){
    super(props);
    this.state = {
      adding: false
    }
  }

  setAdd(bool) {
    this.setState({adding: bool});
  }

  render() {
    if (!this.state.adding) {
      return (
      <button 
        className='exerciseAdd-button'
        onClick={() => this.setAdd(true)}
      >
        Add an exercise
      </button>
    )}

    return <ExerciseForm
      action='Adding'
      setEdit={(bool) => this.setAdd(bool)}
      workoutId={this.props.workoutId}
     />
  };
};