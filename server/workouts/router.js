'use strict';
const express = require('express');

const { Profile } = require('../users/model');
const { Workout } = require('./model');
const { Exercise } = require('../exercises/model');

const { createError, handleError, sendRes} = require('../utils');

const router = express.Router({mergeParams: true});

// create new workout
router.post('/', (req, res) => {
  const {workoutName} = req.body;
  const _workoutName = workoutName.trim();
  const {userId} = req.params;
  console.log('===REQ PARAMS ===\n', req.params)
  return Profile
    .findOne({userId})
    .populate('workouts')
    .then(user => {
      // find out if workname already exists for this user
      let result = user.workouts.find(workout => {
        return workout.workoutName === _workoutName;
      });
      if(result){
        return createError(
          'validationError', 
          `Workout "${_workoutName}" already exists for this user`,
          400
        );
      };
      return Workout
        .create({workoutName: _workoutName});
    })
    .then(newWorkout => {
      return Profile
        .findOne({userId})
        .then(profile => {
          profile.workouts.push(newWorkout._id);
          profile.save();
          return profile
        })
    })
    .then(profile => {
      return res.status(201).json(profile.serialize());
    })
    .catch(err => {
      console.error('create workout error===>\n', err)
      return handleError(err, res);
    });
});


//get all workouts
router.get('/', (req, res) => {
  return Profile
    .findOne({userId:req.params.userId})
    .populate('workouts')
    .then(user => {
      console.log('=== USER WORKOUTS ===', user);
      return res.status(200).json(user.workouts);
    })
    .catch(err => {
      return res.status(500).json({message: 'something went wrong'});
    });
})

// get all exercises for a workout
router.get('/:workoutId', (req, res) => {
  return Workout
    .findById(req.params.workoutId)
    .populate('exercises')
    .then(workout => {
      if (!workout) {
        return createError('validationError', 'workout not found', 404);
      }
      return res.status(200).json(workout);
    })
    .catch(err => {
      console.log(err);
      return handleError(err, res);
    });
});

// update workout
// validate if workout exists
router.put('/:workoutId',(req, res) =>{
  const { workoutName } = req.body;
  const {userId, workoutId} = req.params;
  if(!workoutName || workoutName && workoutName.trim() === ""){
    return res.status(400).json({message: 'workout field cannot be empty'});
  }
  return Profile
    .findOne({userId})
    .populate('workouts')
    .then(user => {
      // find out if workname already exists for this user
      let result = user.workouts.find(workout => {
        return workout.workoutName === workoutName;
      });
      if(result && result._id.toString() !== workoutId){
        console.log('update workout result \n', result._id)
        console.log('update workout result \n', workoutId)
        return createError(
          'validationError', 
          `Workout "${workoutName}" already exists for this user`,
          400
        );
      };
      return Workout
        .findByIdAndUpdate(workoutId, {workoutName})
    }) 
    .then(result => {
      if(!result){
        return Promise.reject({
          reason: 'validationError',
          message: 'workout not found',
          code: 400
        });
      }
      return res.status(200).json({message: 'workout updated successfully!'});
    })
    .catch(err => {
      console.error('workout edit error\n', err)
      if(err.reason === 'validationError'){
        return res.status(err.code).json({message: err.message});
      }
      return res.status(500).json({message: 'Something went wrong...'});
    });
});

// delete workout with exercises
router.delete('/:workoutId', (req, res) => {
  const {workoutId, userId} = req.params;

  return Profile
    .findOne({userId})
    .then(user => {
      console.log('=== USER WORKOUTS ===\n', user.workouts);
      user.workouts.remove(workoutId);
      user.save();
      return user;
    })
    .then(user => {
      console.log('=== USER WORKOUT w REMOVED ====\n',user.workouts)
      return Workout
        .findById(workoutId)
    })
    .then(workout => {
      if (!workout) {
        return createError('validationError', 'workout not found', 404);
      }
      const { exercises } = workout;
      return Exercise
        .deleteMany({_id: {$in: exercises}});
    })
    .then(result => {
      console.log('=== EXERCISE DELETE RESULT ===\n', result);
      return Workout
        .findByIdAndDelete(workoutId);
    })
    .then(result => {
      console.log('=== WORKOUT DELETE RESULT ===\n', result);
      return res.status(202).json({message: `Workout deleted`});
    })
    .catch(err => {
      console.error('=== ERROR ===\n', err);
      return handleError(err, res);
    });
});

module.exports = { router };