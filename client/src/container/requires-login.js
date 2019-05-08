import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import {getProfile} from '../actions/user';

const requiresLogin = Component => {
  class RequiresLogin extends React.Component {

    render() {
      console.log('requires login props', this.props);
      const {hasToken, loading, error} = this.props.auth;

      if (!hasToken) {
        return <Redirect to='/' />;
      };

      if(error) {
        return <div>
          <p>An error has occured, try logging back <Link to='/login'>in</Link></p>
        </div>
      }

      if (loading) {
        return <div>Authenticating...</div>;
      };

      if (hasToken) {
        return <Component  />;
      }

      return <Redirect to='/' />
    };
  };

  const displayName = Component.displayName || Component.name || 'Component';
  RequiresLogin.displayName = `RequiresLogin(${displayName})`;

  const mapStateToProps = ({auth, user}, ownProps) => ({
    auth: {
      hasToken: auth.token !== null,
      loading: auth.loading,
      error: auth.error
    }
  });

  return connect(mapStateToProps)(RequiresLogin);
};

export default requiresLogin;