const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const ExerciseSchema = mongoose.Schema({
  exerciseName: {type: String, required: true},
  resistance: String, 
  resistUnit: String,
  reps: Number,
  sets: Number,
  notes: String
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = {Exercise};