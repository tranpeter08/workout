import React, { Component } from 'react';
import ExerciseForm from '../container/ExerciseForm';
import Delete from '../../workouts/containers/Delete';
import '../style/exercise.css';

export default class Exercise extends Component {
  state = {
    editing: false,
    deleting: false
  }

  setEdit(bool) {
    this.setState({editing: bool})
  }

  setDelete(bool) {
    this.setState({deleting: bool})
  }

  render() {
    const {editing, deleting} = this.state;
    const initialValues = {...this.props};
    const {
      _id, 
      exerciseName, 
      resistance, 
      reps, 
      sets, 
      notes, 
      resistUnit, 
      workoutId } = this.props;

    if (editing) {
      // create separate function
      return <ExerciseForm
        action='Editing'
        form={_id}
        initialValues={initialValues}
        setEdit={(bool) => this.setEdit(bool)}
        exerciseName={exerciseName}
        workoutId={workoutId}
        exerciseId={_id}
      />
    }

    if (deleting) {
      // create separate function
      return <Delete 
        type='exercise'
        title={exerciseName}
        itemId={_id}
        workoutId={workoutId}
        setDelete={(bool) => this.setDelete(bool)}
      />
    }
    
    return (
      <React.Fragment>
        <h3>{exerciseName}</h3>
        <hr className='exercise-hr'/>
        <div className='exercise-detail-container'>
          <p>
            <span>Resistance:</span> {resistance} {resistUnit === 'other'? null : resistUnit}
          </p>
          <p><span>Reps:</span> {reps}</p>
          <p><span>Sets:</span> {sets}</p>
          <p><span>Notes:</span> {notes}</p>
        </div>
        <div className='exercise-button-container'>
          <button onClick={()=> this.setEdit(true)}>Edit</button>
          <button onClick={() => this.setDelete(true)}>Delete</button>
        </div>
      </React.Fragment>
    )
  }
};