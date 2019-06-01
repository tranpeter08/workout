import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk'
import authReducer from './auth/auth-reducer';
import userReducer from './user/user-reducer';
import workoutReducer from './workouts/workout-reducer';
import exerciseReducer from './exercises/exercise-reducer';
import recipesReducer from './recipes/recipes-reducer';
import myRecipesReducer from './myRecipes/myRecipes-reducer';
import { loadToken } from './misc/local-storage';
import { authPersist } from './auth/auth-actions';

const appReducer =
  combineReducers({
    form: formReducer,
    workout: workoutReducer,
    exercise: exerciseReducer,
    auth: authReducer,
    user: userReducer,
    recipes: recipesReducer,
    myRecipes: myRecipesReducer
  });


const RESET_APP = 'RESET_APP';
export const resetApp = () => ({type: RESET_APP});

const rootReducer = (state, action) => {
  if (action.type === RESET_APP) {
    state = undefined;
  }
  return appReducer(state, action);
}

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);


const authToken = loadToken();
if (authToken) {
  store.dispatch(authPersist(authToken))
};

export default store;