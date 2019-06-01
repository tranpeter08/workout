import React from 'react';
import {shallow, mount} from 'enzyme';
import NavLinkA from './NavLink';

describe('<NavLinkA />', () => {
  let wrapper;
  it('should render without crashing', () => {
    shallow(<NavLinkA to='' />);
  })
})