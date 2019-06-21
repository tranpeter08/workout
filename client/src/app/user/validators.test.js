import {
  required, 
  notEmpty, 
  isTrimmed, 
  noSpaceInside, 
  length, 
  matching, 
  selected
} from './validators';

describe('validators', () => {
  describe('required', () => {
    it('returns the right warning', () =>{
      expect(required()).not.toBeNull();
      expect(required()).toEqual('*Required');
      expect(required('test')).toBeNull();
    });
  });
  
  describe('notEmpty', () => {
    it('returns the right warning', () => {
      let warning = '*Cannot be empty';

      expect(notEmpty()).toBeNull();
      expect(notEmpty()).not.toEqual(warning);
      expect(notEmpty(' ')).toEqual(warning);
    });
  });

  describe('isTrimmed', () => {
    it('returns the right warning', () => {
      let warning = '*Cannot start or end with whitespace';

      expect(isTrimmed('')).toBeNull();
      expect(isTrimmed('')).not.toEqual(warning);
      expect(isTrimmed('test ')).toEqual(warning);
      expect(isTrimmed(' test ')).toEqual(warning);
      expect(isTrimmed(' test')).toEqual(warning);
      expect(isTrimmed('test ')).not.toBeNull();
    });
  });

  describe('noSpaceInside', () => {
    it('returns the right warning', () => {
      let warning = '*Cannot have spaces between characters';

      expect(noSpaceInside('')).toBeNull();
      expect(noSpaceInside('')).not.toEqual(warning);
      expect(noSpaceInside('test')).toBeNull();
      expect(noSpaceInside('test test')).not.toBeNull();
      expect(noSpaceInside('test test')).toEqual(warning);
    });
  });

  describe('length', () => {
    it('returns the right warning', () => {
      let
        min = 5,
        max = 10,
        warningMin = `*Must be at least ${min} characters`,
        warningMax = `*Must be less than than ${max}`;

      let stringLength = number => {
        let str = '';

        for (let i = 0; i < number; i++) {
          str+= 'a';
        };

        return str;
      };

      const validate = num => length(min, max)(stringLength(num));

      expect(validate(5)).not.toEqual(warningMin);
      expect(validate(5)).not.toEqual(warningMax);
      expect(validate(5)).toBeNull();

      expect(validate(4)).not.toEqual(warningMax);
      expect(validate(4)).not.toBeNull();
      expect(validate(4)).toEqual(warningMin);

      expect(validate(11)).not.toEqual(warningMin);
      expect(validate(11)).not.toBeNull();
      expect(validate(11)).toEqual(warningMax);
    });
  });

  describe('matching', () => {
    it('returns the right warning', () => {
      let 
        warning = '*Passwords do not match',
        confirmPassword = '',
        allValues = {};

      expect(matching(confirmPassword, allValues)).toBeNull();
      expect(matching(confirmPassword, allValues)).not.toEqual(warning);

      allValues.password = '1234';

      expect(matching(confirmPassword, allValues)).not.toBeNull();
      expect(matching(confirmPassword, allValues)).toEqual(warning);

      confirmPassword = '12345';

      expect(matching(confirmPassword, allValues)).not.toBeNull();
      expect(matching(confirmPassword, allValues)).toEqual(warning);

      confirmPassword = allValues.password;

      expect(matching(confirmPassword, allValues)).toBeNull();
      expect(matching(confirmPassword, allValues)).not.toEqual(warning);
    });
  });

});