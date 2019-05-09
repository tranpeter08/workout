import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import normalizeDate from '../components/normalize-date';
import WorkoutForm from './workout-form';
import Delete from './delete';

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
    if(this.state.editing){
      return <WorkoutForm 
        form={_id}
        initialValues={{workoutName, _id}}
        setEditing={(bool) => this.setEditing(bool)}
        action='Editing'
        workoutName={workoutName}
      />
    };
    
    if (this.state.deleting) {
      return <Delete
        itemId = {_id}
        type='workout'
        title={workoutName}
        setDelete={(bool) => this.setDelete(bool)}
      />
    };

    const exercisesLink = `/user/${username}/${workoutName}/exercises`;
    return (
      <div >
        <h4><Link to={exercisesLink}>{workoutName}</Link></h4>
        <button 
          type='button' 
          onClick={() => this.setEditing(true)}>
          Edit
        </button>
        <button 
          type='button' 
          onClick={() => this.setDelete(true)}>
          Delete
        </button>
      </div>
    )
  };
}

const mapStateToProps = ({auth: {username}}) => ({username});
export default connect(mapStateToProps)(Workout);