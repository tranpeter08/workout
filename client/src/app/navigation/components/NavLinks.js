import React from 'react';
import NavLinkA from './NavLink';

export default function NavLinks({collapse, username, handleLogout}) {
  const path = `/user/${username}`;

  const mainLinks = [
    [
      '/workouts', 
      'Workouts', 
      <i className="fas fa-dumbbell icon"></i>
    ],
    [
      '/nutrition', 
      'Nutrition', 
      <i className="fas fa-apple-alt icon"></i>
    ],
    [
      '/recipes/search', 
      'Recipes', 
      <i className="fas fa-drumstick-bite icon"></i>
    ],
    [
      '/recipes/myRecipes', 
      'My Recipes', 
      <i className="fas fa-utensils icon"></i>
    ],
    'logout'
  ];

  const login = ['/login', 'Login', <i className="fas fa-sign-in-alt"></i>];

  const logout= (
    <li key='logout'>
      <button
        className='logout-button' 
        onClick={handleLogout}
      >
        <i className="fas fa-sign-out-alt icon"></i> Logout
      </button>
    </li>
  );

  const mapLink = link => {
    let newPath = link[0] === '/login' ? link[0] : `${path}${link[0]}`;
    return <li key={link[0]}>
      <NavLinkA to={newPath} label={link[1]} icon={link[2]} />
    </li>
  };

  const renderMainLinks = () => mainLinks.map(link => 
    link === 'logout' ? logout : mapLink(link));

  return (
    <ul className={collapse ? 'collapse' : ''}>
      {username ? renderMainLinks() : mapLink(login)}
    </ul>
  );
}