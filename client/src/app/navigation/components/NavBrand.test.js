import React from 'react';
import NavBrand from './NavBrand';
import {shallow, mount, render} from 'enzyme';
import {BrowserRouter as Router} from 'react-router-dom';

describe('<NavBrand />', () => {
  let wrapper;
  it('should render without crahsing', () => {
    wrapper = shallow(<NavBrand />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain the right heading', () => {
    const wrapper = shallow(<NavBrand />);
    expect(wrapper.find('.nav-brand-font').text()).toEqual('GET SWOLE');
  });

  it('should call closeNav when clicked', () => {
    const closeNav = jest.fn();
    const component = (
      <NavBrand closeNav={closeNav} />
    );

    wrapper = shallow(component);
    wrapper
      .find('.nav-brand')
      .simulate('click');
      expect(closeNav).toHaveBeenCalled();
  });
});