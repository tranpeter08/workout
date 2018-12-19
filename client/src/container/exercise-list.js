import React, { Component } from 'react';
import { connect } from 'react-redux';

import Exercise from '../components/exercise';
import AddItem from '../components/exercise-add';
import ExerciseForm from './exercise-form';

export class ExerciseList extends Component {
  //fetch data according to workout id
  render() {

    const workout = this.props.workouts.find( workout => 
      workout.id.toString() === this.props.match.params.workoutId
    );

    const exerciseList = workout.exercises.map( exercise => {
      return <li key={exercise.id}>
        <Exercise {...exercise} />
      </li>
    })

    return(
      <div>
        <h3>{workout.workout} Exercises</h3>
        <ul>
          <li>
            <AddItem type='exercise'/>
          </li>
          {exerciseList}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ workouts }, props) => ({
  workouts
});

export default connect(mapStateToProps)(ExerciseList);