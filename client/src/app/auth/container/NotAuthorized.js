import React from 'react';
import {connect} from 'react-redux';
import {logOut} from '../auth-actions';
import {Redirect} from 'react-router-dom';
import '../styling/notAuthorized.css';

export class NotAuthorized extends React.Component{
  state={
    redirect: false
  }

  componentDidMount() {
    this.logoutTimer = setTimeout(
      this.handleLogout,
      2 * 1000
    );
  }

  componentWillUnmount() {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
  }

  handleLogout =()=> {
    this.setState(
      {redirect: true},
      () => this.props.dispatch(logOut())
    )
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }

    return (
      <main className='notAuthorized-main'>
      <div className='notAuthorized-container'>
        <i className="notAuthorized-icon fas fa-exclamation-triangle"></i>
        <h2>ERROR 401</h2>
        <p>Unauthorized access! Logging out...</p>
      </div>
      </main>
    )
  }
}

export default connect()(NotAuthorized);