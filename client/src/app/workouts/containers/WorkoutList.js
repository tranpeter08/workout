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
        <li className='workout-li' key={workout._id} >
          <Workout {...workout} />
        </li>
      )
      .reverse();
    }
  }

  render() {

    return (
      <section className='workouts-section'>
        <h2>Workouts</h2>
        <ul aria-live='polite'>
          <WorkoutAdd />
          {this.renderWorkouts()}
        </ul>
      </section>
    )
  }
}; 

const mapStateToProps = ({workout: {workouts}}) => ({workouts});

export default connect(mapStateToProps)(WorkoutList);