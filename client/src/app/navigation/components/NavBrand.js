import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../strong-white.png';

export default function NavBrand({closeNav}) {
  return (
    <NavLink to='/' className='nav-brand' onClick={closeNav}>
      <h1 className='nav-brand-font'>GET SWOLE</h1>
      <img className='nav-brand-img' src={logo} alt='Logo of strong arm'/>
    </NavLink>
  )
}