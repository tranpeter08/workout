import React, { Component } from 'react';
import { connect } from 'react-redux';
import Exercise from '../components/exercise';
import ExerciseAdd from '../components/exercise-add';

export class ExerciseList extends Component {

  render() {
    
    const {workoutName} = this.props.match.params;
    const {workouts} = this.props;
    const workout = workouts.find(workout =>
      workout.workoutName === workoutName
    );
    const exerciseList = workout.exercises.map( exercise => {
        return <li key={exercise._id}>
          <Exercise {...exercise} workoutId={workout._id} />
          </li>
    });

    return(
      <div>
        <h3>{workoutName} Exercises</h3>
        <ul>
          <li>
            <ExerciseAdd type='exercise' workoutId={workout._id} />
          </li>
          {exerciseList.reverse()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({user: {profile : {workouts}}}, props) => ({
  workouts
});
export default connect(mapStateToProps)(ExerciseList);