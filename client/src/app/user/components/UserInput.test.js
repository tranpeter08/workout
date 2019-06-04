import React from 'react';
import {shallow} from 'enzyme';
import UserInput from './UserInput';

describe('<UserInput />', () => {
  const props = {
    input: {
      name: ''
    },
    label: '',
    type: '',
    meta: {
      touched: false, 
      error: false
    }
  };

  it('renders without crashing', () => {
    shallow(<UserInput {...props}/>);
  });
});