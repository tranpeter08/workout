import React from 'react';
import {shallow} from 'enzyme';
import WeightFields from './WeightFields';

describe('<WeightFields />', () => {
  it('renders without crashing', () => {
    shallow(<WeightFields />);
  })

  it('contains the right class', () => {
    const wrapper = shallow(<WeightFields />);

    expect(wrapper.hasClass('form-group')).toBe(true);
  })
})