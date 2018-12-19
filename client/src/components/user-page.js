import React from 'react';
import UserInfo from '../container/user-info';
import WorkoutList from '../container/workout-list';

const UserPage = (props) => {
  return (
    <div>
      <UserInfo />
      <WorkoutList />
    </div>
  )
};

export default UserPage;