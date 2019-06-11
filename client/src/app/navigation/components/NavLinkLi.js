import React from 'react';
import {NavLink} from 'react-router-dom';
import {NavContext} from '../containers/Navigation';

const NavLinkLi = ({className, to, icon, label, exact}) => {
  const style = {
    color: 'rgb(0, 175, 255)'
  }

  return (
    <NavContext.Consumer>
      { value => (
        <li>
          <NavLink
            className={className}
            activeStyle={style} 
            exact={exact} 
            to={to}
            onClick={value.closeNav}
          >
            {icon} {label}
          </NavLink>
        </li>
      )}
    </NavContext.Consumer>
  )
};

export default NavLinkLi;