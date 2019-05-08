import React, { Component } from 'react';
import ExerciseForm from '../container/exercise-form';
import Delete from '../container/delete';

export default class Exercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      deleting: false
    }
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

    if(editing) {
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

    if(deleting) {
      return <Delete 
        type='exercise'
        title={exerciseName}
        itemId={_id}
        workoutId={workoutId}
        setDelete={(bool) => this.setDelete(bool)}
      />
    }
    
    return(
      <div>
        <h3>{exerciseName}</h3>
        <p>Resistance: {resistance} {resistUnit === 'other'? null : resistUnit}</p>
        <p>Reps: {reps}</p>
        <p>Sets: {sets}</p>
        <p>Notes: {notes}</p>
        <button onClick={() => this.setEdit(true)}>Edit</button>
        <button onClick={() => this.setDelete(true)}>Delete</button>
      </div>
    )
  }
};