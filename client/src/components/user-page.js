import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, Redirect} from 'react-router-dom';
import UserInfo from '../container/user-info';
import WorkoutList from '../container/workout-list';
import ExerciseList from '../container/exercise-list';
import requiresLogin from '../container/requires-login';
import {getProfile} from '../actions/user';

class UserPage extends React.Component {
  state = {
    redirect: false
  }
  componentDidMount() {
    this.props.dispatch(getProfile());
  }

  renderError = () => {
    // show error 
    // set timout 
    // redirect
  }

  render() {
    console.log('user page proops', this.props)
    const {profile, loading, error} = this.props.user;
    if (error) {
      return <div>error</div>;
    }

    if (loading) {
      return <div>loading</div>;
    }

    if (profile) {
      return (
        <React.Fragment>
          <UserInfo />
          <Switch>
            <Route path='/user/:username/:workoutName/exercises' component={ExerciseList} />
            <Route path='/user/:username/' component={WorkoutList} />
          </Switch>
        </React.Fragment>
      )
    }
    return <div>loading...</div>
  }
};

const mapStateToProps = ({user}, props) => ({user})

export default requiresLogin(connect(mapStateToProps)(UserPage));