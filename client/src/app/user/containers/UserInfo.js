import React from 'react';
import {connect} from 'react-redux';
import '../style/userInfo.css';

export class UserInfo extends React.Component {

  renderUserInfo() {
    const {profile} = this.props;
    if (profile) {
      const {bodyFat, height, name, weight} = profile;
      return (
        <section className='userInfo-section'>
          <img className='userInfo-img' src='https://cdn.pixabay.com/photo/2014/10/22/17/25/stretching-498256_1280.jpg' alt='User' />
          <div className='userInfo-detail-container'>
            <h2>{name}</h2>
            <p>Height: {height}</p>
            <p>Weight: {weight}</p>
            <p>Body Fat: {bodyFat}%</p>
          </div>
        </section>
      )
    }
  }

  render() {
    return this.renderUserInfo()
  }
}

const mapStateToProps = ({user: {profile}}, props) => { 
  const {workouts, ..._profile} = profile;
  return {profile : _profile}
};

export default connect(mapStateToProps)(UserInfo);