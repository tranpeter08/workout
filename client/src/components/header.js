import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/user/:username">Workouts</Link>
    </nav>
  )
}

export default Header;