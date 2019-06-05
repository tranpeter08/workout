import React from 'react';
import {shallow} from 'enzyme';
import Select from './Select';

describe('<Select />', () => {
  const props = {
    meta: {
      touched: false, 
      error: ''
    }, 
    options: [], 
    label: ''
  }

  it('renders without crashing', () => {
    shallow(<Select {...props} />)
  });

  it('renders the correct options', () => {
    const options = [];
    for (let i =1; i <= 5; i++) {
      options.push('option ' + i)
    }

    const wrapper = shallow(<Select {...props}/>);
    console.log(wrapper.debug());
    wrapper.setProps({options});

    let select = wrapper.find('select');
    
    expect(select.children()).toHaveLength(options.length);
    expect(select.childAt(2).props().value).toBe(options[2]);
    expect(select.childAt(0).props().value).toBe(options[0]);
  });
})