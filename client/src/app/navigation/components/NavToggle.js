import React from 'react';

export default function NavToggle({collapse, toggleNav}) {

  return (
    <button
      name='navButton'
      aria-label={collapse ? "Open Menu" : "Close Menu"}
      onClick={toggleNav}
      className={collapse ? 'nav-button' : 'nav-button open'}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  )
}