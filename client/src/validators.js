export const required = value => value ? null : '*Required';

export const notEmpty = value => value.trim() === '' ?
  'Cannot be empty' : null;

export const isTrimmed = value => value.trim() !== value? 
  '*Cannot start or end with whitespace':null;

export const noSpaceInside = value => 
  value.split(' ').length > 1 ? 'Cannot have spaces between characters' : null;

export const length = (min, max) => value => {
  if(min && value.length < min) {
    return `*Must be at least ${min} characters`;
  }
  if(max && value.length > max) {
    return `*Must be less than than ${max}`
  }
};

export const matching = inputName => (value, allValues) =>
  inputName in allValues && value !== allValues[inputName]?
    '*Passwords do not match' : null;

export const selected = inputName => (value, allValues) => {
  return inputName in allValues && !value? '* Choose an option'  : null; 
};