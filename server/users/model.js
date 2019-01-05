'use scrict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  height: {
    type: Number,
    default: ''
  },
  heightUnit: {
    type: String,
    default: ''
  },
  inches: {
    type: Number,
    default: ''
  },
  weight: {
    type: Number,
    default: ''
  },
  weightUnit: {
    type: String,
    default: ''
  },
  bodyFat: {
    type: Number,
    default: ''
  }
});

UserSchema.virtual('fullName').get(function() {
  return (`${this.firstName} ${this.lastName}`).trim();
});

UserSchema.virtual('fullHeight').get(function() {
  if(!this.height) {
    return '';
  }

  let inches;
  if(this.inches) {
    inches = `${this.inches}''`
  };

  const fullHeight = this.heightUnit === 'ft' ? `${this.height}' ${inches}` :
    `${this.height} ${this.heightUnit}`;

  return fullHeight.trim();
})

UserSchema.methods.serialize = function() {

  return {
    username: this.username,
    name: this.fullName,
    height: this.fullHeight,
    weight: (`${this.weight || ''} ${this.weightUnit || ''}`).trim(),
    bodyFat: `${this.bodyFat || ''}`
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}

const User = mongoose.model('User', UserSchema);

module.exports = {User};