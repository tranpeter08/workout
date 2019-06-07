import React, { Component } from 'react';
import { connect } from 'react-redux';
import Workout from './Workout';
import WorkoutAdd from '../components/WorkoutAdd';
import {getWorkouts} from '../workout-actions';
import '../styling/workoutList.css';

export class WorkoutList extends Component {
  componentDidMount() {
    this.props.dispatch(getWorkouts());
  }

  renderWorkouts() {
    const {workouts} = this.props;
    if (workouts) {
      return workouts.map(workout =>
        <Workout key={workout._id} {...workout} />
      )
      .reverse();
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

const mapStateToProps = ({workout: {workouts}}) => ({workouts});

export default connect(mapStateToProps)(WorkoutList);