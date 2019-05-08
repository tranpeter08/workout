import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import ExerciseInput from '../components/exercise-input';
import { createExercise, editExercise, exerciseClearError} from '../actions/exercise-actions';

export class ExerciseForm extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  componentDidMount() {
    const input = document.getElementsByName('exerciseName')[0];
    if(input){
      input.focus();
    }
    document.addEventListener('click', this.handleClickOut, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOut, false);
  }

  onSubmit = data => {
    if (data.exerciseName) {
    const {action, dispatch, workoutId, exerciseId} = this.props;

      if (action === 'Adding') {
      return dispatch(createExercise(workoutId, data))
        .then(this.handleResErr);
      }

      if (action === 'Editing') {
        return dispatch(editExercise(workoutId, exerciseId, data))
          .then(this.handleResErr);
      }
    }
  }

  handleClickOut = event => {
    if(this.node.current.contains(event.target)) {
      return;
    }

    this.props.setEdit(false);
    this.props.dispatch(exerciseClearError());
  }

  handleResErr = resErr => {
    return resErr ? null : this.props.setEdit(false);
  }

  render() {
    const {
      action, 
      exerciseName, 
      handleSubmit, 
      setEdit,
      anyTouched,
      exercise: {error}
    } = this.props
    return (
      <form 
        action="" 
        onSubmit={handleSubmit((values) => this.onSubmit(values))}
        ref={this.node}
      >
        <h2>{action} {exerciseName? exerciseName : 'exercise'}</h2>
    
          <Field
            name='exerciseName'
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
          <button type='submit' disabled={this.props.submitting}>Submit</button>
          <button type='button' onClick={() => setEdit(false)}>Cancel</button>
          {anyTouched && error && <span>{error.message}</span>}
        </form>
    )
  }
}

const mapStateToProps = ({exercise}, props) =>
  ({exercise});

export default connect(mapStateToProps)(reduxForm({
  form: 'ExerciseForm'
})(ExerciseForm));