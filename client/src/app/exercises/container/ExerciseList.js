import React, { Component } from 'react';
import { connect } from 'react-redux';
import Exercise from '../components/Exercise';
import ExerciseAdd from '../components/ExerciseAdd';
import {getExercises} from '../exercise-actions';
import '../style/exerciseList.css';

class ExerciseList extends Component {
  componentDidMount() {
    this.props.dispatch(getExercises(this.selectWorkoutId));
  }

  get selectWorkoutId() {
    const {location: {state: {workoutId}}} = this.props;
    return workoutId;
  }

  renderExercises() {
    const {exercise: {exercises}} = this.props;
    
    if (exercises) {
      return exercises.map(exercise => 
        <li key={exercise._id}>
          <Exercise {...exercise} workoutId={this.selectWorkoutId} />
        </li>
      )
      .reverse();
    }
  }

  render() {
    const {
      match: {params: {workoutName}},
      history: {goBack}
    } = this.props;

    return(
      <section className='exercises-section'>
        <h2>Exercises for "{workoutName}"</h2>
        <button 
          className='exercises-back-button' 
          onClick={() => goBack()}
        >
          <i className="fas fa-arrow-left"></i> To Workouts
        </button>
        <ul>
          <li className='exerciseAdd-li'>
            <ExerciseAdd type='exercise' workoutId={this.selectWorkoutId} />
          </li>
          {this.renderExercises()}
        </ul>
      </section>
    )
  }
}

const mapStateToProps = ({exercise}) => ({exercise});

export default connect(mapStateToProps)(ExerciseList);