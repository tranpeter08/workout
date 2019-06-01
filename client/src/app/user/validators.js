export const required = value => value ? null : '* Required';

export const notEmpty = value => !value ? null : value.trim() === '' ?
  '* Cannot be empty' : null;

export const isTrimmed = value => value.trim() !== value? 
  '* Cannot start or end with whitespace':null;

export const noSpaceInside = value => 
  value.split(' ').length > 1 ? 'Cannot have spaces between characters' : null;

const length = (min, max) => value => {
  if(min && value.length < min) {
    return `*Must be at least ${min} characters`;
  }
  if(max && value.length > max) {
    return `*Must be less than than ${max}`
  }
};

export const usernameLength = length(8, 20);

export const passwordLength = length(10);

export const matching = (value, allValues) => {
  if ('password' in allValues && value !== allValues['password']) {
    return '*Passwords do not match' 
  }
};

export const selected = inputName => (value, allValues) => {
  return inputName in allValues && !value? '* Choose an option'  : null; 
};