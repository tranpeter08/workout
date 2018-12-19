import React, { Component } from 'react';
import { connect } from 'react-redux';
import Workout from '../components/workout';
import WorkoutAdd from '../components/workout-add';

export class WorkoutList extends Component {

  render() {
    console.log('Workouts:', this.props);
    const workoutList = this.props.workouts.map((workout) => {

      return <li key={workout.id}>
        <Workout {...workout} />
      </li>
    });

    return (
      <div>
        <h2>Workouts</h2>
        <ul>
          <li><WorkoutAdd /></li>
          {workoutList}
        </ul>  
      </div>
    )
  }
}; 

const mapStateToProps = ({workouts}, props) => ({
  workouts,
});

export default connect(mapStateToProps)(WorkoutList);