import React from 'react';
import {NavLink} from 'react-router-dom';
import {NavContext} from '../containers/Navigation';

const NavLinkA = ({className, to, icon, label}) => {
  const style = {
    color: 'rgb(0, 175, 255)'
  }

  return (
    <NavContext.Consumer>
      { value => (
          <NavLink
            className={className}
            activeStyle={style} 
            exact={true} 
            to={to}
            onClick={value.closeNav}
          >
            {icon} {label}
          </NavLink>
      )}
    </NavContext.Consumer>
  )
};

export default NavLinkA;