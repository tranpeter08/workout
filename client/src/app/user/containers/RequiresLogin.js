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
        console.error('Req Login Error:', error);
        return <main className='reqLogin-error'>
          <p>An error has occured, try logging back <Link to='/login'>in</Link></p>
        </main>
      }

      if (loading) {
        return <div>Authenticating...</div>;
      };

      if (hasToken) {
        return <Component {...otherProps} />;
      }

      return <div></div>;
    };
  };

  const displayName = Component.displayName || Component.name || 'Component';
  RequiresLogin.displayName = `RequiresLogin(${displayName})`;

  const mapStateToProps = ({auth}) => ({
    auth: {
      hasToken: auth.token !== '',
      loading: auth.loading,
      error: auth.error
    }
  });

  return connect(mapStateToProps)(RequiresLogin);
};

export default requiresLogin;