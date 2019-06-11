import React from 'react';
import {connect} from 'react-redux';
import UserForm from './UserForm';
import '../style/userInfo.css';

export class UserInfo extends React.Component {
  state = {
    edit: false
  }

  toggleForm() {
    this.setState((state) => ({edit: !state.edit}));
  }

  renderForm(profile) {
    return this.state.edit ? 
      <UserForm 
        initialValues={profile} 
        toggleForm={() => this.toggleForm()} /> 
      : 
      null
  }

  normalizeHeight() {
    const {height, heightUnit, inches} = this.props.profile;
    if (heightUnit === 'ft' && !inches) {
      return `${height}'`
    }
    
    if (heightUnit === 'ft') {
      return `${height}'  ${inches}"`
    }

    return `${height} ${heightUnit}`
  }

  render() {
    const {
      bodyFat, 
      firstName, 
      lastName, 
      weight, 
      weightUnit
    } = this.props.profile;

    const name = `${firstName} ${lastName}`;

    return (
      <section className='userInfo-section'>
        {this.renderForm(this.props.profile)}
        <img className='userInfo-img' src='https://cdn.pixabay.com/photo/2014/10/22/17/25/stretching-498256_1280.jpg' alt='User' />
        <div className='userInfo-detail-container'>
          <h2>{name.trim()}</h2>
          <p>Height: {this.normalizeHeight()}</p>
          <p>Weight: {weight} {weightUnit}</p>
          <p>Body Fat: {bodyFat}%</p>
          <button onClick={()=> this.toggleForm()}>Edit</button>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({user: {profile}}) => { 
  const {workouts, ..._profile} = profile;
  return {profile : _profile}
};

export default connect(mapStateToProps)(UserInfo);