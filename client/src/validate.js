const validate = (values) => {

  const errors = {};

  if(!values.heightUnit) {
    errors.heightUnit = 'Select an option'
  }

  return errors;
}

export default validate;