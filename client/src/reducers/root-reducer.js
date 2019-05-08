import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import workoutReducer from './workout-reducer';
import { exerciseReducer } from './exercise-reducer';
import { authReducer } from './auth_reducer'
import { userReducer } from './user-reducer'
import thunk from 'redux-thunk'
import { loadToken } from '../local-storage';
import {authPersist} from '../actions/auth';

const rootReducer = createStore(
  combineReducers({
    form: formReducer,
    workout: workoutReducer,
    exercise: exerciseReducer,
    auth: authReducer,
    user: userReducer
  }),
  applyMiddleware(thunk)
)

const authToken = loadToken();
if (authToken) {
  rootReducer.dispatch(authPersist(authToken))
};

export default rootReducer;