const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema();

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
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
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.methods.serialize = function() {
  const inches;
  if(this.inches) {
    inches = ` ${this.inches} in.`
  };

  return {
    username: this.username,
    fullName: this.fullName,
    height: `${this.height} ${this.heightUnit}${inches || null}`,
    weight: `${this.weight} ${this.weightUnit}`,
    bodyFat: `${this.bodyFat} %`
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