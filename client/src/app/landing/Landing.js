import React from 'react';
import {Link} from 'react-router-dom';
import NavLinkA from '../navigation/components/NavLink';
import Feature from './components/Feature';
import './landing.css';

export default function Landing(props) {
  const featuresData = [
    ['landing-workouts', 'Workouts', 'Easily create workouts and add exercises. Exercises can be edited to achieve higher goals (higher reps, resistance, etc).'],
    ['landing-nutrition resp', 'Nutrition', 'Find nutrition facts for a food or product from a vast database*.'],
    ['landing-recipes resp', 'Recipes', 'Search for a recipe to view ingredients, nutrition facts and recipe instructions*. Recipes can also be saved for future reference.']
  ];

  function renderFeatures() {
    return featuresData.map(feature => 
      <Feature key={feature[1]} className={feature[0]} heading={feature[1]} text={feature[2]} />)
  }

  return (
    <main className='landing'>

      <section className='landing-intro'>
        <div className='intro-wrapper'>
          <h2>Welcome!</h2>
          <p>Hello!
            GET SWOLE is a fitness app used to manage workouts, find nutrition information, search and save recipes, but most importantly, GET SWOLE!</p>
        </div>
        <p><NavLinkA className='intro-login' to='/login' label='Login' /> to begin.<br/>
        Don't have an account?<br/>
        <NavLinkA className='intro-register' to='register' label='Sign-up'/></p>
      </section>

      <section className='landing-features'>
        <h2>Features</h2>
        
        <div className='features-wrapper'>
          {renderFeatures()}
        </div>

        <small className='landing-footnote'>* Search results provided by <a href='https://www.edamam.com/'>Edamam</a></small>
      </section>
    </main>
  )
}