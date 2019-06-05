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
        <li key={workout._id}>
          <Workout {...workout} />
        </li>
      );
    }

    return workoutList.reverse();
  }

  render() {

    return (
      <section className='workouts-section'>
        <h2>Workouts</h2>
        <ul>
          <li><WorkoutAdd /></li>
          {this.renderWorkouts()}
        </ul>  
      </section>
    )
  }
}; 

const mapStateToProps = ({user: {profile: {workouts}}}) => ({workouts});

export default connect(mapStateToProps)(WorkoutList);