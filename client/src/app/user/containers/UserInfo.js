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

  normalizeHeight({height, heightUnit, inches}) {
    
    if (heightUnit === 'ft' && inches) {
      return `${height}' ${inches}"`
    }

    if (heightUnit === 'ft' && height && !inches) {
      return `${height}'`
    };

    if (!height && inches) {
      return `${inches}"`
    };
    
    if (!height) {
      return '';
    }

    // `6' ; 6'6" ; 6cm ; 6" ; ''`

    return `${height} ${heightUnit}`;
  }

  normalizeWeight({weight, weightUnit}) {
    if (!weight) {
      return '';
    }

    return `${weight} ${weightUnit}`; 
  }

  renderUserInfo(profile) {
    if (profile) {
      const {
        bodyFat, 
        firstName, 
        lastName
      } = profile;

      const name = `${firstName || ''} ${lastName || ''}`;
    
      return (
        <div className='userInfo-detail-container'>
          <h2>{name.trim()}</h2>
          <p>Height: {this.normalizeHeight(profile)}</p>
          <p>Weight: {this.normalizeWeight(profile)}</p>
          <p>Body Fat: {bodyFat}%</p>
          <div className='profile-button-container'>
            <button 
              type='button'
              onClick={this.toggleForm}
              aria-label='Edit Profile'
            >
              <i className="edit-profile-icon far fa-edit"></i>
            </button>
          </div>
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
        {/* <img className='userInfo-img' src='https://cdn.pixabay.com/photo/2014/10/22/17/25/stretching-498256_1280.jpg' alt='User' /> */}
        <div className='profile-container'>
          {this.renderUserInfo(profile)}
          {error && <ErrorMessage message={error.message} />}
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({user}) => {
  return {user}
};

export default connect(mapStateToProps)(UserInfo);