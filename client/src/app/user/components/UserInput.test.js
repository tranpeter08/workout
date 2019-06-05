import React from 'react';
import {shallow, mount} from 'enzyme';
import UserInput from './UserInput';

describe('<UserInput />', () => {
  let props;
  beforeEach(() => {
    props = {
      input: {
        name: ''
      },
      label: '',
      type: '',
      meta: {
        touched: false, 
        error: false
      }
    };
  })

  it('renders without crashing', () => {
    shallow(<UserInput {...props}/>);
  });

  it('if there is an error, display error', () => {
    const wrapper = shallow(<UserInput {...props} />);
    let error = wrapper.find('.validation-err');
    expect(error.children()).toHaveLength(0);
 
    const newProps = { 
      meta: {
        error: 'test error message',
        touched: true
    }};

    wrapper.setProps(newProps);

    error = wrapper.find('.validation-err');
    expect(error.children()).toHaveLength(1);
    expect(error.text()).toBe(newProps.meta.error);
  })

  it('should display correct text after input depending on label value', () => {
    const wrapper = shallow(<UserInput {...props} />);
    let text1 = 'Arms',
      text2 = 'Body Fat';

    expect(wrapper.text()).toBe('in.');

    wrapper.setProps({label: text1});
    expect(wrapper.find('label').text()).toBe(text1);

    wrapper.setProps({label: text2});
    expect(wrapper.find('label').text()).toBe(text2);
    expect(wrapper.text().includes('%')).toBe(true);
  })

});