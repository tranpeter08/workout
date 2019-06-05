import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field} from 'redux-form';

import WorkoutInput from '../components/WorkoutInput';
import {required, notEmpty} from '../../user/validators';
import {createWorkout, editWorkout, clearErrors} from '../workout-actions';

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
    if(data.workoutName) {
      const {action, form, dispatch} = this.props;
      if(action === 'Adding') {
        return dispatch(createWorkout(data))
        .then(this.handleResErr);
      };

      if(action === 'Editing') {
        return dispatch(editWorkout(data, form))
          .then(this.handleResErr);
      };
    }
  };

  handleResErr = resErr => resErr ? null : null //this.props.setEditing(false)};

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
    // console.log('workoutform props', this.props)
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
        action="" 
        onSubmit={handleSubmit(values => this.onSubmit(values))}
        ref={this.node}>
          <h2>{action} {workoutName? workoutName : 'workout'}</h2>
          <Field
            name='workoutName'
            label='Workout:'
            component={WorkoutInput}
            validate={[notEmpty]}
            onChange={() => this.onChange()}
          />
          <button 
            type='submit' 
            disabled={this.props.submitting}
            >Submit
          </button>
          <button 
            type='button' 
            onClick={() => this.onCancel()}
          >Cancel
          </button>
        <span>{statusMessage()}</span>
      </form>
    );
  };
};

const mapStateToProps = ({workout}, props) => ({workout});

export default connect(mapStateToProps)(reduxForm({
  form: 'WorkoutForm'
})(WorkoutForm));