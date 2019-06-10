import React, { Component} from 'react';
import WorkoutForm from '../containers/WorkoutForm';
import '../styling/workoutAdd.css';

export default class WorkoutAdd extends Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false
    }
  }

  setEditing(bool) {
    this.setState({editing: bool});
  }

  render() {
    if (!this.state.editing) {
      return (
        <li className='workoutAdd-li' >
          <button aria-label='Add a workout' onClick={() => this.setEditing(true)}>
          <i className="add-icon fas fa-plus-circle"></i>
          </button>
        </li>
      )
    };

    return (
      <li>
        <WorkoutForm
          form='NewWorkout'
          setEditing={(bool) => this.setEditing(bool)}
          action='Adding'
        />
      </li>
    )
  };
};