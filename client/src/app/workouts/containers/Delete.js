import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteWorkout} from '../../workouts/workout-actions';
import {deleteExercise} from '../../exercises/exercise-actions';
import '../styling/delete.css';

export class Delete extends Component {
  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  handleClick = (e) => {
    if(this.node.current.contains(e.target)) {
      return;
    }
    this.props.setDelete(false);
  }

  onYesDelete() {
    const {
      type, 
      dispatch, 
      workoutId, 
      itemId
    } = this.props;

    if (type === 'workout') {
      return dispatch(deleteWorkout(itemId))
    }

    if (type === 'exercise') {
      return dispatch(deleteExercise(workoutId, itemId))
    }
  };

  render() {
    const {
      type, 
      title, 
      setDelete, 
      workout: {loading, error}
    } = this.props;
    
    return(
      <li className='delete-li' ref={this.node}>
        <h3 className='delete-header'>Delete {type} "{title}"?</h3>
        <div className='delete-button-container'>
          <button type='button' onClick={() => this.onYesDelete()}>Yes</button>
          <button type='button' onClick={() => setDelete(false)}>No</button>
        </div>
        <div className='delete-status'>
          {
            loading ? <span>Deleting...</span> :
            error ? <span className='error'>{error.message}</span> : null
          }
        </div>
      </li>
    )
  }
}

const mapStateToProps = ({workout}) => ({workout});

export default connect(mapStateToProps)(Delete);