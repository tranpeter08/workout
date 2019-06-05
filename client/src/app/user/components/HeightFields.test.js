import React from 'react';
import {shallow} from 'enzyme';
import HeighFields from './HeightFields';
import HeightFields from './HeightFields';

describe('<HeightFields />', () => {
  it('renders without crashing', () => {
    shallow(<HeighFields heightUnitValue={''} />);
  })

  it('has the correct class', () => {
    const heightUnit = 'ft'
    let wrapper = shallow(<HeightFields heightUnitValue={heightUnit} />);
    expect(wrapper.hasClass('form-group')).toBe(true);
  })

  it('renders an additional field if height unit is not "cm"', () => {
    let wrapper = shallow(<HeightFields heightUnitValue={'cm'} />);
    expect(wrapper.children()).toHaveLength(3);
    
    wrapper.setProps({heightUnitValue: 'ft'});
    let inchesSpan =wrapper.find('span');
    expect(inchesSpan.exists()).toBe(true);
    expect(inchesSpan.hasClass('inches-span')).toBe(true);
    expect(wrapper.children()).toHaveLength(4);
  })
})
