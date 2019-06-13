import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logOut} from '../auth-actions';
import ErrorMessage from './ErrorMessage';
import {Redirect} from 'react-router-dom';

export class NotAuthorized extends React.Component{
  state={
    redirect: false
  }

  // componentDidMount() {
  //   this.logoutTimer = setTimeout(
  //     this.handleLogout,
  //     3 * 1000
  //   );
  // }

  // handleLogout =()=> {
  //   this.setState(
  //     {redirect: true},
  //     () => this.props.dispatch(logOut())
  //   )
  // }

  render() {
    console.log(this.props);
    if (this.state.redirect) {
      return <Redirect to='/' />
    }

    return (
        <main>
          <ErrorMessage />
        </main>
    )
  }
}

export default connect(null, {logOut})(NotAuthorized);