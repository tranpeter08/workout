import React from 'react';
import {connect} from 'react-redux';
import {logOut} from '../auth-actions';
import {Redirect} from 'react-router-dom';

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
          <h2>ERROR 401</h2>
          <p>Unauthorized access! Logging out...</p>
        </main>
    )
  }
}

export default connect()(NotAuthorized);