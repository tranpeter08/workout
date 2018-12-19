import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field} from 'redux-form';
import WorkoutInput from '../components/workout-input';

export class WorkoutForm extends Component {
  // props: setEdit(boolean), initialValues, form, action,

  onSubmit(data) {
    console.log('form data:',data);
    this.props.setEdit(false);
  }

  render() {
    console.log('workoutFORM: ',this.props);
    const {action, workout, handleSubmit, setEdit} = this.props;
    return (
      <div>
        <h2>{action} {workout? workout : 'workout'}</h2>
        <form 
          action="" 
          onSubmit={handleSubmit( values => this.onSubmit(values))}
        >
          <Field
            name='workout'
            label='Workout:'
            component={WorkoutInput}
          />
          <button 
            type='submit' 
          >Submit</button>
          <button 
            type='button' 
            onClick={() => setEdit(false)}
          >Cancel</button>
        </form>
      </div>
    )
  }
}

export default connect()(reduxForm({
  form: 'WorkoutForm'
})(WorkoutForm));