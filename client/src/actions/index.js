'use strict';
import {SubmissionError} from 'redux-form'
import { API_BASE_URL } from '../config'

export const SUBMITTING = 'SUBMITTING';
export const submitting = () => ({
  type: SUBMITTING,
  loading: true
});

export const CREATE_ERROR = 'CREATE_ERROR';
export const createError = (error) => ({
  type: CREATE_ERROR,
  loading:false,
  payload: error
})

export const CREATE_USER_SUCCESS = 'CREATE_WORKOUT_SUCCESS';
export const createUserSuccess = (user) => ({
  type: CREATE_USER_SUCCESS,
  loading: false,
  loggedIn: true,
  payload: user
});

export const CREATE_WORKOUT_SUCCESS = 'CREATE_WORKOUT_SUCCESS';
export const createWorkoutSuccess = (workout) => console.log(workout);

export const createWorkout = (workout, callback) => dispatch => {
  dispatch(submitting());
  return fetch('/workout', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(workout)
  })
  .then(res => res.json())
  .then(callback)
  .catch(createError);
}

export const fetchWorkout = () => dispatch => {
  //making request
  //success
  //error
}
const updateWorkout = (id, data, callback) => dispatch => {

  return fetch(`/workout/${id}`, {
    method: 'PUT',
    headers: {'content-type':'application/json'},
    body: data
  })
  .then()
}
//submit form to database

//create new user

//sign-in

//auth

//