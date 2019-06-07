import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field} from 'redux-form';

import WorkoutInput from '../components/WorkoutInput';
import {required, notEmpty} from '../../user/validators';
import {createWorkout, editWorkout, clearErrors} from '../workout-actions';
import '../styling/workoutForm.css'

class WorkoutForm extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  };

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  };

  handleClick = e => {
    if(this.node.current.contains(e.target)){
      return;
    }

    this.props.setEditing(false)
    this.props.dispatch(clearErrors());
  };

  onSubmit = data => {
    if (data.workoutName) {
      const {action, form, dispatch} = this.props;
      if (action === 'Adding') {
        return dispatch(createWorkout(data))
        .then(this.handleResErr);
      };

      if (action === 'Editing') {
        return dispatch(editWorkout(data, form))
          .then(this.handleResErr);
      };
    }
  };

  handleResErr = resErr => resErr ? null : this.props.setEditing(false);

  onCancel() {
    this.props.setEditing(false);
    this.props.dispatch(clearErrors());
  }

  onChange() {
    if(this.props.workout.error){
      this.props.dispatch(clearErrors());
    }
  }

  render() {
    const {
      action, 
      workoutName, 
      handleSubmit,
      workout: {error, loading},
      anyTouched
      } = this.props;

    const statusMessage = () => {
      if (loading) {
        return 'Submitting...'
      }

      if (anyTouched && error) {
        return `${error.message}`
      }
    };

    return (
      <form 
        className='workout-form'
        onSubmit={handleSubmit(values => this.onSubmit(values))}
        ref={this.node}
      >
        {/* <h3 >{action} {workoutName? workoutName : 'a workout'}</h3> */}
        <Field
          name='workoutName'
          label='Workout Name'
          component={WorkoutInput}
          validate={[notEmpty]}
          onChange={() => this.onChange()}/>
        <div className='workout-button-container'>
          <button className='workoutForm-button-submit'
            type='submit' 
            disabled={this.props.submitting}
            >Submit
          </button>
          <button 
            type='button' 
            onClick={() => this.onCancel()}
          >
            Cancel
          </button>
        </div>
        <div className='workout-form-status'>
          { 
            loading ? <span>Submitting</span> : 
            anyTouched && error ? <span className='error'>{error.message}</span> : null
          }
        </div>
      </form>
    );
  };
};

const mapStateToProps = ({workout}, props) => ({workout});

export default connect(mapStateToProps)(reduxForm({
  form: 'WorkoutForm'
})(WorkoutForm));