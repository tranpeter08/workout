import React, { Component } from 'react';
import ExerciseForm from '../container/exercise-form';
import Delete from '../components/delete';

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
    console.log('exercise props', this.props);
    const {editing, deleting} = this.state;
    const initialValues = {...this.props};
    const {id, exercise, resistance, reps, sets, notes, resistUnit } = this.props;

    if(editing) {
      return <ExerciseForm
        action='Editing'
        form={id.toString()}
        initialValues={initialValues}
        setEdit={(bool) => this.setEdit(bool)}
        exercise={exercise}
      />
    }

    if(deleting) {
      return <Delete 
        type='exercise'
        title={exercise}
        setDelete={(bool) => this.setDelete(bool)}
      />
    }

    
    return(
      <div>
        <h3>{exercise}</h3>
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