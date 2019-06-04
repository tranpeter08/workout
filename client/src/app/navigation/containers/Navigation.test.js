import React from 'react';
import {shallow, mount} from 'enzyme';
import {Route, BrowserRouter as Router, withRouter} from 'react-router-dom';
import {Navigation} from './Navigation';

describe('<Navigation />', () => {
  let handleWindowResize = jest.spyOn(
    Navigation.prototype, 'handleWindowResize'
  );

  it('renders without crashing', () => {
    shallow(<Navigation />);
  });

  it('calls handleWindowResize on window resize', () => {
    let wrapper = mount(
      <Router>
        <Navigation />
      </Router>
    );
    
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));

    expect(handleWindowResize).toHaveBeenCalled();
  });

  it('changes the state on window resize', () => {
    global.innerWidth = 400;
    global.dispatchEvent(new Event('resize'));

    let wrapper = shallow(
        <Navigation />
    );

    wrapper.setState({collapse: false})
    expect(wrapper.state('collapse')).toBe(false);
    
    global.innerWidth = 800;
    global.dispatchEvent(new Event('resize'));
    expect(wrapper.state('collapse')).toBe(true);
  });

  it('calls closeNav and dispatch when handleLogout is called', () => {
    let dispatch = jest.fn();
    let wrapper = shallow(<Navigation dispatch={dispatch}/>);

    let instance = wrapper.instance();
    let closeNav = jest.spyOn(instance, 'closeNav');
    instance.handleLogout();
    expect(dispatch).toHaveBeenCalled();
    expect(closeNav).toHaveBeenCalled();
  });

  it('changes state when "toggleNav" is called', () => {
    let wrapper = shallow(<Navigation />);
    wrapper.instance().toggleNav();
    expect(wrapper.state('collapse')).toBe(false);
    wrapper.instance().toggleNav();
    expect(wrapper.state('collapse')).toBe(true);
  });

  it('sets collapse to false when closeNav is called', () => {
    let wrapper = shallow(<Navigation />);
    wrapper.setState({collapse: false});
    wrapper.instance().closeNav();
    expect(wrapper.state().collapse).toBe(true);
  });
});