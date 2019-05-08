import React, { Component} from 'react';
import ExerciseForm from '../container/exercise-form';

export default class ExerciseAdd extends Component {
  //props: type
  constructor(props){
    super(props);
    this.state = {
      adding: false
    }
  }

  setAdd(bool) {
    this.setState({adding: bool});
  }

  render() {
    if(!this.state.adding){
      return <div 
        onClick={() => this.setAdd(true)}
      >Add an exercise</div>
    }

    return <ExerciseForm
        action='Adding'
        setEdit={(bool) => this.setAdd(bool)}
        workoutId={this.props.workoutId}
     />
  };
};