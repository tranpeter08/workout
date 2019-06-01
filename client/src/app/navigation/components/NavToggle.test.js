import React from 'react';
import {shallow, mount} from 'enzyme';
import NavToggle from './NavToggle';

describe('<NavTogle />', () => {
  let wrapper;
  it('should render without crashing', () => {
    wrapper = shallow(<NavToggle />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.hasClass('nav-button')).toBeTruthy();
  })

  it('should have class "open" when collapse is false', () => {
    wrapper = shallow(<NavToggle collapse={false} />)
    expect(wrapper.hasClass('open')).toBeTruthy();
  })

  it('should call "toggleNav" on "click"', () => {
    let toggleNav = jest.fn()
    wrapper = shallow(<NavToggle toggleNav={toggleNav} />);
    wrapper.simulate('click');
    expect(toggleNav).toHaveBeenCalled();
  })
})