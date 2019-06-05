import React from 'react';
import {shallow, mount} from 'enzyme';
import Landing from './Landing';
import {MemoryRouter} from 'react-router-dom';

describe('<Landing />', () => {
  let wrapper;

  it('renders without crashing', () => {
    shallow(<Landing />);
  });

  it('contains the correct sections', () => {
    wrapper = shallow(<Landing />);

    expect(wrapper.hasClass('landing')).toBe(true);
    expect(wrapper.find('.landing-intro').exists()).toBe(true);
    expect(wrapper.find('.landing-features').exists()).toBe(true);
    expect(wrapper.find('.features-wrapper').children()).toHaveLength(3);
  });

  it('the links route to the correct path', () => {
    let wrapper = mount(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    expect(wrapper.exists('a[href="/login"]')).toBe(true);
    expect(wrapper.find('a.intro-login').text()).toBe('Login');
    expect(wrapper.exists('a[href="/register"]')).toBe(true);
    expect(wrapper.find('a.intro-register').text()).toBe('Register');
  });
});