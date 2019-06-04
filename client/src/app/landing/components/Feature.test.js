import React from 'react';
import {shallow} from 'enzyme';
import Feature from './Feature';

describe('<Feature />', () => {
  it('renders without crashing', () => {
    shallow(<Feature />);
  })

  it('handles props correctly', () => {
    let className = 'landing-workouts',
    heading = 'Workouts',
    text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ';
    
    let wrapper = shallow(
      <Feature 
        className={className}
        heading={heading}
        text={text} />
    );

    expect(wrapper.hasClass(className)).toBe(true);
    expect(wrapper.contains(<h3>{heading}</h3>)).toBe(true);
    expect(wrapper.contains(<p>{text}</p>)).toBe(true);
  })
})