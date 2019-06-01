import React, { Component } from 'react';
import { connect } from 'react-redux';
import Workout from './Workout';
import WorkoutAdd from '../components/WorkoutAdd';

export class WorkoutList extends Component {

  render() {
    const {workouts} = this.props;
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

const mapStateToProps = ({user: {profile: {workouts}}}, props) => ({workouts});

export default connect(mapStateToProps)(WorkoutList);