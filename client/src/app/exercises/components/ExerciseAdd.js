import React, { Component} from 'react';
import ExerciseForm from '../container/ExerciseForm';
import '../style/exerciseAdd.css';

export default class ExerciseAdd extends Component {
  constructor(props){
    super(props);
    this.state = {
      adding: false
    }
  }

  setAdd(bool) {
    this.setState({adding: bool});
  }

  renderForm() {
    if (this.state.adding) {
      return (
        <ExerciseForm
        action='Adding'
        setEdit={(bool) => this.setAdd(bool)}
        workoutId={this.props.workoutId} />
    )}
  }

  render() {
    return (
      <React.Fragment>
        {this.renderForm()}
        <button 
          className='exerciseAdd-button'
          aria-label='Add an exercise'
          onClick={() => this.setAdd(true)}
        >
          <i className="add-icon fas fa-plus-circle"></i>
        </button>
    </React.Fragment>
    )
  };
};