import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import workoutReducer from './workout-reducer';
import { authReducer } from './auth_reducer'
import thunk from 'redux-thunk'

const rootReducer = createStore(
  combineReducers({
    form: formReducer,
    workouts: workoutReducer,
    auth: authReducer
  }),
  applyMiddleware(thunk)
)

export default rootReducer;