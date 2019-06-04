import React from 'react';
import {shallow} from 'enzyme';
import UserInputs from './UserInputs';

describe('<UserInputs />', () => {
  it('renders without crashing', () => {
    shallow(<UserInputs heightUnitValue={'cm'} />)
  })
})