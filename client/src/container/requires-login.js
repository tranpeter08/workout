import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const requiresLogin = Component => { 
  const RequiresLogin = props => {
    const {loading, user, error, ...passThruProps} = props;
    if (loading) {
      return <div>Loading...</div>;
    } else if (user) {
      return <Component {...passThruProps} />;
    } else {
      return <div>Something went wrong... T_T</div>;
    };
  };

  const displayName = Component.displayName || Component.name || 'Component';
  RequiresLogin.displayName = `RequiresLogin(${displayName})`;

  const mapStateToProps = ({auth: {loading, user, error}}, props) => ({
    loading,
    user,
    error
  });

  return connect(mapStateToProps)(RequiresLogin);
};

export default requiresLogin;