import React from 'react';
import {shallow} from 'enzyme';

import DetailView from './DetailView';

const serviceDetails = {
    title:'Title'
};

describe('Component : DetailView', () =>{
  const wrapper = shallow(<DetailView {...serviceDetails}/>);
  it('Renders without exploding',()=>{
    expect(wrapper.contains(
      <div className="DetailView">
        <div>
          <div className="fieldKey">title</div>
          <div className="fieldValue">Title</div>
        </div>
      </div>
    ));
  });

  it('Renders without crashing',()=>{
    expect(wrapper.length).toBe(1);
  });

});
