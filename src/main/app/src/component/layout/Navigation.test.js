import React from 'react';
import { shallow } from 'enzyme';

import Navigation from './Navigation';

const wrapper = shallow(<Navigation/>);

describe('Component : Navigation', ()=>{
  it('Renders without crashing',()=>{
    expect(wrapper.length).toBe(1);
  });
});
