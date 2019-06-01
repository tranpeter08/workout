import React from 'react';
import {shallow} from 'enzyme';
import NavLinks from './NavLinks';
import NavLinkA from './NavLink';

describe('<NavLinks />', ()=> {
  let wrapper;
  const login = (
    <NavLinkA 
      to="/login" 
      label="Login" 
      icon={<i className="fas fa-sign-in-alt"></i>} 
    />
  )
  it('should render without crashing', () => {
    wrapper = shallow(<NavLinks />);
    expect(wrapper.exists()).toBeTruthy();
  })

  it('should have class "collapse" if collapse props is "true"', () => {
    wrapper = shallow(<NavLinks collapse={true} />);
    expect(wrapper.hasClass('collapse')).toBeTruthy();
  })

  it('should render main navigation links if user is logged in', () => {
    wrapper = shallow(<NavLinks username={'user'} />);
    expect(wrapper.find('li').length).toBeGreaterThan(1);
    expect(wrapper.contains(login)).toBeFalsy();

    const logOutButton = wrapper.find('button.logout-button');
    expect(logOutButton.exists()).toBeTruthy();
  })

  it('should not render main links if user is not logged in', () => {
    wrapper = shallow(<NavLinks />);
    expect(wrapper.find('li').length).toEqual(1);
    expect(wrapper.contains(login)).toBeTruthy();

    const logOutButton = wrapper.find('button.logout-button');
    expect(logOutButton.exists()).toBeFalsy();
  })

  it('should call "handleLogout" when logout button is clicked', () => {
    const handleLogout = jest.fn();
    wrapper = shallow(
      <NavLinks username={'user'} handleLogout={handleLogout} />
    );
    
    wrapper.find('button.logout-button').simulate('click');
    expect(handleLogout).toHaveBeenCalled();
  })
})