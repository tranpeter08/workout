import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import ExerciseInput from '../components/exercise-input';

export class ExerciseForm extends Component {
//props: form, setEdit(bool), action, initial values, exercise
  onSubmit(data) {
    //action update exercise (PUT)
    console.log('exercise data:',data);
    this.props.setEdit(false);
  }

  render() {
    const {action, exercise, handleSubmit, setEdit} = this.props
    return (
      <div>
        <h2>{action} {exercise? exercise : 'exercise'}</h2>
        <form 
          action="" 
          onSubmit={handleSubmit((values) => this.onSubmit(values))}
        >
          <Field
            name='exercise'
            label='Exercise'
            type='text'
            component={ExerciseInput}
          />
          <Field
            name='resistance'
            label='Resistance'
            type='text'
            component={ExerciseInput}
          />          
          <Field name='resistUnit' component='select'>
            <option value="lb">lb</option>
            <option value="kg">kg</option>
            <option value="other">other</option>
          </Field>
          <Field
            name='reps'
            label='Reps'
            type='number'
            component={ExerciseInput}
          />         
          <Field
            name='sets'
            label='Sets'
            type='number'
            component={ExerciseInput}
          />
          <Field
            name='notes'
            label='Notes'
            type='text'
            component={ExerciseInput}
          />
          <button type='submit'>Submit</button>
          <button type='button' onClick={() => setEdit(false)}>Cancel</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'NewExercise'
})(ExerciseForm);