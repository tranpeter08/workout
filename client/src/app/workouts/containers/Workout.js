import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import WorkoutForm from './WorkoutForm';
import Delete from './Delete';
import '../styling/workout.css';

export class Workout extends Component {
  constructor(props){
    super(props);
    this.state= {
      editing: false,
      deleting: false
    };
  };

  setEditing(bool) {
    this.setState({
      editing: bool
    });
  };

  setDelete(bool) {
    this.setState({
      deleting: bool
    });
  };

  render() {
    const {workoutName, _id, username} = this.props;
    const {editing, deleting} = this.state;
    const exercisesPath = `/user/${username}/workouts/${workoutName}/exercises`;
    const location = {
      pathname: exercisesPath,
      state: {workoutId: _id}
    };

    if (editing) {

      return (
        <li className='workout-li'>
          <WorkoutForm
            form={_id}
            initialValues={{workoutName, _id}}
            setEditing={(bool) => this.setEditing(bool)}
            action='Editing'
            workoutName={workoutName}
          />
        </li>
      )
    };
    
    if (deleting) {

      return (
        <Delete
          itemId = {_id}
          type='workout'
          title={workoutName}
          setDelete={(bool) => this.setDelete(bool)}
        />
      )
    };

    return (
      <li className='workout-li'>
        <h3><Link to={location}>{workoutName}</Link></h3>
        <div className='workout-button-container'>
          <button 
            type='button' 
            onClick={() => this.setEditing(true)}>
            Edit
          </button>
          <button 
            type='button' 
            onClick={() => this.setDelete(true)}
          >
            Delete
          </button>
        </div>
      </li>
    )
  };
};

const mapStateToProps = ({auth: {username}}) => ({username});
export default connect(mapStateToProps)(Workout);