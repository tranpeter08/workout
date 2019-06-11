import React from 'react';
import NavLinkLi from './NavLinkLi';

export default function NavLinks({collapse, username, handleLogout}) {
  const path = `/user/${username}`;

  return (
    <ul className={collapse ? 'nav-links-main collapse' : 'nav-links-main'}>
      { 
        username ?
          <React.Fragment>
            <NavLinkLi
              to={`${path}/workouts`}
              label='Workouts'
              icon={<i className="fas fa-dumbbell icon"></i>}/>
            <NavLinkLi
              to={`${path}/nutrition`}
              label='Nutrition' 
              icon={<i className="fas fa-apple-alt icon"></i>}/>
            <NavLinkLi 
              to={`${path}/recipes/search`}
              label='Recipes' 
              icon= {<i className="fas fa-drumstick-bite icon"></i>}/>
            <NavLinkLi 
              to={`${path}/recipes/myRecipes`}
              label='My Recipes'
              icon={<i className="fas fa-utensils icon"></i>}/>
            <li>
              <button
                className='logout-button' 
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt icon"></i> Logout
              </button>
            </li>
          </React.Fragment>
          :
          <NavLinkLi 
            to='/login'
            label='Login'
            icon={<i className="fas fa-sign-in-alt"></i>}/>
      }
    </ul>
  );
};