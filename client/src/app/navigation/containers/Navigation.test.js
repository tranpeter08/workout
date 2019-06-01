import React from 'react';
import {shallow, mount} from 'enzyme';
import Navigation from './Navigation';
import {Route, MemoryRouter, BrowserRouter as Router, withRouter} from 'react-router-dom';

describe('<Navigation />', () => {
  let wrapper;

  it('should render without crashing', () => {
    wrapper = shallow(<Navigation />);
    expect(wrapper).toMatchSnapshot();
  });
})