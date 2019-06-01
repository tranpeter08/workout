import React from 'react';
import './footer.css'

export const Footer = props => {
  return <footer className='footer-app'>
    <section className='icon-section'>
      <h2>Connect</h2>
        <span className='contact-text'>
          <a aria-label="Email" href='mailto:tran.peter08@gmail.com'>
            <i className="fas fa-envelope"></i>
          </a>
          <a aria-label="GitHub" href='https://github.com/tranpeter08'>
            <i className="fab fa-github"></i>
          </a>
          <a aria-label="LinkedIn" href='https://www.linkedin.com/in/petertran08/'>
            <i className="fab fa-linkedin"></i>
          </a>
        </span>
    </section>
    <section className='copyright'>
    <p>© 2019 Apollo Testing Systems, Inc</p>
    </section>
  </footer>
}