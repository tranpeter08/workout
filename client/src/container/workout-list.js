import React, { Component } from 'react';
import { connect } from 'react-redux';
import Workout from './workout';
import WorkoutAdd from '../components/workout-add';

export class WorkoutList extends Component {

  render() {
    console.log('Workout list pROPS:', this.props);
    const {workouts} = this.props.user.profile;
    let workoutList;
    if (workouts) {
      workoutList = workouts.map(workout => {
        return <li key={workout._id}>
          <Workout {...workout} />
        </li>
      });
    }
    return (
      <div>
        <h2>Workouts</h2>
        <ul>
          <li><WorkoutAdd /></li>
          {workoutList.reverse()}
        </ul>  
      </div>
    )
  }
}; 

const mapStateToProps = ({user}, props) => ({user});

export default connect(mapStateToProps)(WorkoutList);