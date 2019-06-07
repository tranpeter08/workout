import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Exercise from '../components/Exercise';
import ExerciseAdd from '../components/ExerciseAdd';
import {getExercises} from '../exercise-actions';
import '../style/exerciseList.css';

class ExerciseList extends Component {
  componentDidMount() {
    const {dispatch, location: {state: {workoutId}}} = this.props;
    dispatch(getExercises(workoutId));
  }

  renderExercises() {
    const {
      location: {state : {workoutId}}, 
      exercise: {exercises}
    } = this.props;
    
    if (exercises) {
      return exercises.map(exercise => 
        <li key={exercise._id}>
          <Exercise {...exercise} workoutId={workoutId} />
        </li>
      )
      .reverse();
    }
  }

  render() {
    const {
      match: {params: {workoutName}},
      location: {state: {workoutId}},
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
          <li>
            <ExerciseAdd type='exercise' workoutId={workoutId} />
          </li>
          {this.renderExercises()}
        </ul>
      </section>
    )
  }
}

const mapStateToProps = ({exercise}) => ({exercise});

export default connect(mapStateToProps)(ExerciseList);