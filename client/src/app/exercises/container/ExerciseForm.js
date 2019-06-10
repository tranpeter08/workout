import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import ExerciseInput from '../components/ExerciseInput';
import ExerciseResist from './ExerciseResist';
import SuccessStatus from '../components/SuccessStatus';
import { 
  createExercise, 
  editExercise, 
  exerciseClearError
} from '../exercise-actions';
import '../style/exerciseForm.css';

export class ExerciseForm extends Component {
  state = {
    succuess: false
  }

  node = React.createRef();

  componentDidMount() {
    const input = document.getElementsByName('exerciseName')[0];
    if(input){
      input.focus();
    }
    document.addEventListener('click', this.handleClickOut, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOut, false);
    this.props.dispatch(exerciseClearError());
    this.clearTime();
  }

  onSubmit = data => {
    if (data.exerciseName) {
    const {action, dispatch, workoutId, exerciseId} = this.props;

      if (action === 'Adding') {
      return dispatch(createExercise(workoutId, data))
        .then(this.handleRes);
      }

      if (action === 'Editing') {
        return dispatch(editExercise(workoutId, exerciseId, data))
          .then(this.handleRes);
      }
    }
  }

  handleClickOut = event => {
    if(this.node.current.contains(event.target)) {
      return;
    }

    this.props.setEdit(false);
  }

  handleRes = isSuccessful => {
    if (isSuccessful) {
      this.setState(
        {succuess: true},
        this.setDisplayTime
      )
    }
  }

  setDisplayTime() {
    this.displayTime = setTimeout(
      () => this.props.setEdit(false),
      1.5 * 1000
    );
  }

  clearTime() {
    if (this.displayTime) {
      clearTimeout(this.displayTime);
    }
  }

  render() {
    const {
      action, 
      exerciseName, 
      handleSubmit, 
      setEdit,
      anyTouched,
      exercise: {error}
    } = this.props;

    return (
    <div className='modal-backdrop'>
      <form 
        className='exerciseForm'
        onSubmit={handleSubmit((values) => this.onSubmit(values))}
        ref={this.node}
      >
        {
          this.state.succuess ? <SuccessStatus /> : 
          <React.Fragment>
            <h3>
              {action}
              {' '}
              {exerciseName ? `exercise "${exerciseName}"` : 'An Exercise'}
            </h3>
            <div className='exercise-fields-container'>
              <Field
                name='exerciseName'
                label='Exercise'
                type='text'
                component={ExerciseInput}
              />
              <ExerciseResist />
              <Field
                name='reps'
                label='Reps'
                type='number'
                className='reps'
                component={ExerciseInput}
              />         
              <Field
                name='sets'
                label='Sets'
                type='number'
                className='sets'
                component={ExerciseInput}
              />
              <Field
                name='notes'
                label='Notes'
                type='text'
                component={ExerciseInput}
              />
            </div>
            <div className='exerciseForm-button-container'>
              <button 
                type='submit' 
                disabled={this.props.submitting}
              >
                Submit
              </button>
              <button 
                type='button' 
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
            </div>
            <div className='exerciseForm-status'>
              { 
                anyTouched && 
                error && 
                <span className='error'>{error.message}</span>
              }
            </div>
          </React.Fragment>
        }
      </form>
    </div>
    )
  }
}

const mapStateToProps = ({exercise}) => ({exercise});

export default connect(mapStateToProps)(reduxForm({
  form: 'ExerciseForm'
})(ExerciseForm));