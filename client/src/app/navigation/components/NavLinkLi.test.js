'use strict';
import React from 'react';
import {shallow, mount} from 'enzyme';
import NavLinkLi from './NavLinkLi';
import {MemoryRouter} from 'react-router-dom';

describe('<NavLinkLi />', () => {
  it('renders without crashing', () => {
    shallow(<NavLinkLi to='' />);
  });

  it('handles props correctly', () => {
    let to = '/landing',
    label = 'Home',
    icon = <i>Icon</i>;
    
    let wrapper = mount(
      <MemoryRouter>
        <NavLinkLi  
          to={to} 
          label={label} 
          icon={icon} />
      </MemoryRouter>
    );

    let link = wrapper.find(`a[href="${to}"]`);

    expect(link.exists()).toBe(true);
    expect(link.text().includes(label)).toBe(true);
    expect(link.contains(icon)).toBe(true);
  });
});