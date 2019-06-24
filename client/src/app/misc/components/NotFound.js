import React from 'react';

export default function NotFound() {
  return (
    <main className='notAuthorized-main'>
      <div className='notAuthorized-container'>
        <i className="notAuthorized-icon fas fa-exclamation-triangle"></i>
        <h2>ERROR 404</h2>
        <p>Not Found...</p>
      </div>
    </main>
  )
}