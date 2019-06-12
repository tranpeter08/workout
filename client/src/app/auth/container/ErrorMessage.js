import React from 'react';
import {connect} from 'react-redux';
import {logOut} from '../auth-actions';
import {Redirect} from 'react-router-dom';

export class ErrorMessage extends React.Component{
  state={
    redirect: false
  }

  componentDidMount() {
    this.logoutTimer = setTimeout(
      this.handleLogout,
      3 * 1000
    );
  }

  handleLogout =()=> {
    this.setState(
      {redirect: true},
      () => this.props.dispatch(logOut())
    )
  }

  render() {
  console.log(this.props);
    if (this.state.redirect) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <h2>ERROR 401</h2>
        <p>Unauthorized access! Logging out...</p>
      </div>
    )
  }
}

export default connect()(ErrorMessage);