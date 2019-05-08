import React from 'react';
import {connect} from 'react-redux';

class UserInfo extends React.Component {

  renderUserInfo() {
    const {profile} = this.props;
    if (profile) {
      const {bodyFat, height, name, weight} = profile;
      return (
        <div>
          <img width='200px' src='https://cdn.pixabay.com/photo/2014/10/22/17/25/stretching-498256_1280.jpg' alt='User' />
          <h3>{name}</h3>
          <span>Height: {height}</span>
          <span>Weight: {weight}</span>
          <span>Body Fat: {bodyFat}%</span>
        </div>
      )
    }
  }

  render() {
    return this.renderUserInfo()
  }
}

const mapStateToProps = ({user: {profile}}, props) => ({profile});

export default connect(mapStateToProps)(UserInfo);