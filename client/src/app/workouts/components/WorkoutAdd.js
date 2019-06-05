import React, { Component} from 'react';
import WorkoutForm from '../containers/WorkoutForm';

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
        <li >
          <button onClick={() => this.setEditing(true)}>Add a workout</button>
        </li>
      )
    };

    return (
      <WorkoutForm
        form='NewWorkout'
        setEditing={(bool) => this.setEditing(bool)}
        action='Adding'
      />
    )
  };
};