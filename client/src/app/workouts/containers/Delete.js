import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteWorkout} from '../../workouts/workout-actions';
import {deleteExercise} from '../../exercises/exercise-actions';

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
    const {type, dispatch, workoutId, itemId, setDelete} = this.props;

    if (type === 'workout') {
      return dispatch(deleteWorkout(itemId))
    }

    if (type === 'exercise') {
      return dispatch(deleteExercise(workoutId, itemId))
    }
  };

  render() {
    return(
      <div ref={this.node}>
        <p>Do you want to delete {this.props.type} "{this.props.title}"?</p>
        <button type='button' onClick={() => this.onYesDelete()}>Yes</button>
        <button type='button' onClick={() => this.props.setDelete(false)}>No</button>
      </div>
    )
  }
}

const mapStateToProps = ({workout}, ownProps) => ({workout});

export default connect(mapStateToProps)(Delete);