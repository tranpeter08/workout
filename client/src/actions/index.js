export const someAction = () => {
}

export const SUBMITTING = 'SUBMITTING';
export const submitting = () => ({
  type: SUBMITTING,
});

export const CREATE_WORKOUT_SUCCESS = 'CREATE_WORKOUT_SUCCESS';
export const createWorkoutSuccess = (workout) => console.log(workout);

export const CREATE_ERROR = 'CREATE_ERROR';
export const createError = (error) => console.log('create error:', error); 

export const fetchWorkout = () => dispatch => {
  //making request
  //success
  //error
}

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