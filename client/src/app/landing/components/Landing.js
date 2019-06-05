import React from 'react';
import {Link} from 'react-router-dom';
import Feature from './Feature';
import '../landing.css';

export default function Landing(props) {
  const introText= 'GET SWOLE is a fitness app used to manage workouts, find nutrition information, search and save recipes, but most importantly, GET SWOLE!'
  const workoutText= 'Easily create workouts and add exercises. Exercises can be edited to achieve higher goals (higher reps, resistance, etc).';
  const nutritionText = 'Find nutrition facts for a food or product from a vast database*.';
  const recipesText = 'Search for a recipe to view ingredients, nutrition facts and recipe instructions*. Recipes can also be saved for future reference.';

  return (
    <main className='landing'>

      <section className='landing-intro'>
        <div className='intro-wrapper'>
          <h2>Welcome!</h2>
          <p>Hello! {introText}</p>
        </div>
        <p><Link className='intro-login' to='/login'>Login</Link> to begin.<br/>
          Don't have an account?<br/>
        <Link className='intro-register' to='/register'>Register</Link></p>
      </section>

      <section className='landing-features'>
        <h2>Features</h2>
        <div className='features-wrapper'>
        
          <Feature
            className='landing-workouts'
            heading='Workouts'
            text={workoutText}
          />
          <Feature
            className='landing-nutrition'
            heading='Nutrition'
            text={nutritionText}
          />
          <Feature
            className='landing-recipes'
            heading='Recipes'
            text={recipesText}
          />
          
        </div>
        <small className='landing-footnote'>* Search results provided by <a href='https://www.edamam.com/'>Edamam</a></small>
      </section>

    </main>
  )
}