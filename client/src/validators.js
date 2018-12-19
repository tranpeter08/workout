export const required = value => value? null : '*Required';

export const notEmpty = value => value.trim() === ''?
  'Cannot be empty' : null;

export const length = length => value => {
  if(length.min && value.length < length.min) {
    return `*Must be at least ${length.min} characters`;
  }
  if(length.max && value.length > length.max) {
    return `*Must be less than than ${length.max}`
  }
}

export const isTrimmed = value => value.trim() !== value? 
  '*Cannot start or end with whitespace':null;

export const matching = inputName => (value, allValues) =>
  inputName in allValues && value.trim() !== allValues[inputName]?
    '*Passwords do not match' : null;

export const selected = inputValue => selectValue => {
  console.log('seleted validate:', inputValue);
  return !inputValue? null: 
    selectValue? null:'*Select an option';
};
