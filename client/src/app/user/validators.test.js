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

      let validate = length(min, max);

      expect(validate(stringLength(5))).not.toEqual(warningMin);
      expect(validate(stringLength(5))).not.toEqual(warningMax);
      expect(validate(stringLength(5))).toBeNull();

      expect(validate(stringLength(4))).not.toEqual(warningMax);
      expect(validate(stringLength(4))).not.toBeNull();
      expect(validate(stringLength(4))).toEqual(warningMin);

      expect(validate(stringLength(11))).not.toEqual(warningMin);
      expect(validate(stringLength(11))).not.toBeNull();
      expect(validate(stringLength(11))).toEqual(warningMax);
    });
  });

  describe('noSpaceInside', () => {
    it('returns the right warning', () => {
      let warning = '';

      // expect(isTrimmed('')).toBeNull();
    });
  });

  describe('noSpaceInside', () => {
    it('returns the right warning', () => {
      let warning = '';

      // expect(isTrimmed('')).toBeNull();
    });
  });

  
});