import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import UserForm from './UserForm';
import {getProfile} from '../user-actions';
import ErrorMessage from '../../misc/components/ErrorMessage';
import '../style/userInfo.css';

export class UserInfo extends React.Component {
  state = {
    edit: false
  }

  componentDidMount() {
    this.props.dispatch(getProfile());
  }

  toggleForm = () => {
    this.setState((state) => ({edit: !state.edit}));
  }

  renderForm(data) {
    return this.state.edit ? 
      <UserForm 
        initialValues={data} 
        toggleForm={this.toggleForm} /> 
      : 
      null
  }

  normalizeHeight() {
    const {height, heightUnit, inches} = this.props.user.profile;
    if (heightUnit === 'ft' && !inches) {
      return `${height}'`
    }

    if (!height && inches) {
      return `${inches}"`
    }
    
    if (heightUnit === 'ft') {
      return `${height}' ${inches}"`
    }

    return `${height} ${heightUnit}`
  }

  renderUserInfo(profile) {
    if (profile) {
      const {
        bodyFat, 
        firstName, 
        lastName, 
        weight, 
        weightUnit
      } = profile;

      const name = `${firstName || ''} ${lastName || ''}`;
    
      return (
        <div className='userInfo-detail-container'>
          <h2>{name.trim()}</h2>
          <p>Height: {this.normalizeHeight()}</p>
          <p>Weight: {weight} {weightUnit}</p>
          <p>Body Fat: {bodyFat}%</p>
          <button 
            type='button'
            onClick={this.toggleForm}
            aria-label='Edit Profile'
          >
            <i className="edit-profile-icon far fa-edit"></i>
          </button>
        </div>
      );
    }
  }

  render() {
    const {
      profile,
      loading,
      error
    } = this.props.user;

    if (error && error.code === 401) {
      return <Redirect to='/unauthorized' />
    }

    return (
      <section className='userInfo-section'>
        {this.renderForm(profile)}
        <img className='userInfo-img' src='https://cdn.pixabay.com/photo/2014/10/22/17/25/stretching-498256_1280.jpg' alt='User' />
        {this.renderUserInfo(profile)}
        {error && <ErrorMessage message={error.message} />}
      </section>
    )
  }
}

const mapStateToProps = ({user}) => {
  return {user}
};

export default connect(mapStateToProps)(UserInfo);