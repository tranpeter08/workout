import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, Redirect, withRouter, Link} from 'react-router-dom';
import UserInfo from '../container/user-info';
import WorkoutList from '../container/workout-list';
import ExerciseList from '../container/exercise-list';
import requiresLogin from '../container/requires-login';
import {getProfile} from '../actions/user';
import { logOut } from '../actions/auth';

class UserPage extends React.Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    this.props.dispatch(getProfile());
  }

  componentWillUnmount() {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
  }

  onError = error => {
    console.log('user error')
    this.logoutTimer = setTimeout(
      this.handleError,
      3*1000
    )
    if ( error.code = 401 ) {
      return <div><p>Unauthorized access. Logging out...</p></div>
    } else {
      return <div><p>An error has occurred. Logging out...</p></div>
    }
  }

  handleError = () => {
    this.setState({redirect: true},
    () => this.props.dispatch(logOut())
    )
  }

  render() {
    const {profile, loading, error} = this.props.user;
    if (error) {
      return this.onError(error);
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
            <Route path='/user/:username' component={WorkoutList} />
          </Switch>
        </React.Fragment>
      )
    }
    return <div></div>
  }
};

const mapStateToProps = ({user}, props) => ({user});

export default requiresLogin(withRouter(connect(mapStateToProps)(UserPage)));