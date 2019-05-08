import React, { Component} from 'react';
import WorkoutForm from '../container/workout-form';

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
    if(!this.state.editing){
      return <div 
        onClick={() => this.setEditing(true)}
      >Add a Workout</div>
    }

    return <WorkoutForm
      form='NewWorkout'  
      setEditing={(bool) => this.setEditing(bool)}
      action='Adding'
    />
  };
};