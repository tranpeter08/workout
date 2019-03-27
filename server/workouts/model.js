const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const WorkoutSchema = mongoose.Schema({
  workoutName: {type: String, required: true},
  exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'}]
})

// WorkoutListSchema.pre('findOne', function(next){
//   this.populate('user');
//   next();
// });

// WorkoutListSchema.pre('find', function(next){
//   this.populate('user');
//   next();
// });

const sampleJSON = {
  user: 'name',
  workouts: [
    {
      workout: 'workout_1',
      exercises: [
        {
          exercise: 'exercise_1',
          resistance: 1, 
          resistUnit: 'lb',
          reps: 1,
          sets: 1,
          notes: 'lorem'
        }, {
          exercise: 'exercise_2',
          resistance: 1, 
          resistUnit: 'lb',
          reps: 1,
          sets: 1,
          notes: 'lorem'
        }
      ]    
    }, {
        workout: 'workout_2',
        exercises: [
          {
            exercise: 'exercise_1',
            resistance: 1, 
            resistUnit: 'lb',
            reps: 1,
            sets: 1,
            notes: 'lorem'
          }, {
            exercise: 'exercise_2',
            resistance: 1, 
            resistUnit: 'lb',
            reps: 1,
            sets: 1,
            notes: 'lorem'
          }
        ]
    }  
  ]     
};

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = {Workout};