import React, { Component} from 'react';
import WorkoutForm from '../container/workout-form';

export default class WorkoutAdd extends Component {
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
    if(!this.state.adding){
      return <div 
        onClick={() => this.setAdd(true)}
      >Add a Workout</div>
    }

    return <WorkoutForm
      form='NewWorkout'  
      setEdit={(bool) => this.setAdd(bool)}
      action='Adding'
      
    />
  };
};