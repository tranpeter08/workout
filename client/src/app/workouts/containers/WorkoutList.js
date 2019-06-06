import React, { Component } from 'react';
import { connect } from 'react-redux';
import Workout from './Workout';
import WorkoutAdd from '../components/WorkoutAdd';
import {getWorkouts} from '../workout-actions';
import '../styling/workoutList.css';

export class WorkoutList extends Component {
  componentDidMount() {
    console.log('mount')
    this.props.dispatch(getWorkouts());
  }

  renderWorkouts() {
    const {workouts} = this.props;
    let workoutList;
    if (workouts) {
      workoutList = workouts.map(workout =>
        <Workout key={workout._id} {...workout} />
      );
      return workoutList.reverse();
    }

    
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

// const mapStateToProps = ({user: {profile: {workouts}}}) => ({workouts});
const mapStateToProps = ({workout: {workouts}}) => ({workouts});

export default connect(mapStateToProps)(WorkoutList);