import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router, 
  Route, 
  Switch 
} from 'react-router-dom';
import rootReducer from './reducers/root-reducer';

import './index.css';

import Header from './components/header';
import Landing from './components/landing';
import Login from './container/login';
import Register from './container/register';
import UserPage from './components/user-page';
import WorkoutForm from './container/workout-form';
import ExerciseList from './container/exercise-list';


import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={rootReducer} >
    <Router> 
      <div>
        <Route path='/' component={Header} />
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/user/:username' component={UserPage} />
        <Route exact path='/user/:username/:workoutId' component={ExerciseList} />
      </div>
    </Router>  
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
