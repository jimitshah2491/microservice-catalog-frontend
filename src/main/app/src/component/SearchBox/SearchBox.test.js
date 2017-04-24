import React from 'react';
import { shallow } from 'enzyme';

import SearchBox from './SearchBox';

const wrapper = shallow(<SearchBox/>);

describe('Component : SearchBox', ()=>{
  it('Renders without crashing',()=>{
      expect(wrapper.length).toBe(1);
  });
});
