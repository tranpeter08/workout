import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';

const requiresLogin = Component => {
  class RequiresLogin extends React.Component {

    render() {
      const {hasToken, loading, error, ...otherProps} = this.props.auth;

      if (!hasToken) {
        return <Redirect to='/' />;
      };

      if (error) {
        return <div>
          <p>An error has occured, try logging back <button>in</button></p>
        </div>
      }

      if (loading) {
        return <div>Authenticating...</div>;
      };

      if (hasToken) {
        return <Component {...otherProps} />;
      }

      return <Redirect to='/' />;
    };
  };

  const displayName = Component.displayName || Component.name || 'Component';
  RequiresLogin.displayName = `RequiresLogin(${displayName})`;

  const mapStateToProps = ({auth}, ownProps) => ({
    auth: {
      hasToken: auth.token !== null,
      loading: auth.loading,
      error: auth.error
    }
  });

  return connect(mapStateToProps)(RequiresLogin);
};

export default requiresLogin;