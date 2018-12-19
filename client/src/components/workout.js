import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import normalizeDate from './normalize-date';
import WorkoutForm from '../container/workout-form';
import Delete from '../components/delete';

export default class Workout extends Component {
  constructor(props){
    super(props);
    this.state= {
      editing: false,
      deleting: false
    }
  }

  setEdit(bool) {
    this.setState({
      editing: bool
    })
  }

  setDelete(bool) {
    this.setState({
      deleting: bool
    })
  }

  render() {
    console.log('workout props', this.props);
    const {workout, id} = this.props;
    if(this.state.editing){
      return <WorkoutForm 
        form={this.props.id.toString()}
        initialValues={{workout, id}}
        setEdit={(bool) => this.setEdit(bool)}
        action='Editing'
        workout={this.props.workout}
      />
    }
    
    if(this.state.deleting) {
      console.log('deleting')
      return <Delete
        type='workout'
        title={this.props.workout}
        setDelete={(bool) => this.setDelete(bool)}
      />
    }

    const dateCreated = new Date(this.props.dateCreated);
    let date = normalizeDate(dateCreated);
    let text = 'Created:';
  
    if(this.props.dateModified){
      date = this.props.dateModified;
      text = 'Modified:'
    };

    return (
      <div>
        <h4><Link to={`/user/${this.props.id}`}>{this.props.workout}</Link></h4>
        <span>{`${text} ${date}`}</span>
        <button type='button' onClick={() => this.setEdit(true)}>Edit</button>
        <button type='button' onClick={() => this.setDelete(true)}>Delete</button>
      </div>
    )
  };
}