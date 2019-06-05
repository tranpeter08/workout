import React, { Component } from 'react';
import { connect } from 'react-redux';
import Workout from './Workout';
import WorkoutAdd from '../components/WorkoutAdd';
import '../styling/workoutList.css';

export class WorkoutList extends Component {
  renderWorkouts() {
    const {workouts} = this.props;
    let workoutList;
    if (workouts) {
      workoutList = workouts.map(workout => 
        <Workout key={workout._id} {...workout} />
      );
    }

    return workoutList.reverse();
  }

  render() {

    return (
      <section className='workouts-section'>
        <h2>Workouts</h2>
        <ul>
          <WorkoutAdd />
          {this.renderWorkouts()}
        </ul>
      </section>
    )
  }
}; 

const mapStateToProps = ({user: {profile: {workouts}}}) => ({workouts});

export default connect(mapStateToProps)(WorkoutList);