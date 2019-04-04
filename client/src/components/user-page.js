import React from 'react';
import {connect} from 'react-redux'

import UserInfo from '../container/user-info';
import WorkoutList from '../container/workout-list';
import requiresLogin from '../container/requires-login';

export class UserPage extends React.Component {

  render() {
    console.log('user-page props', this.props)
    return (
      <div>
        <UserInfo />
        <WorkoutList />
      </div>
    )
  }
};

export default UserPage;