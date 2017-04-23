import React from 'react';
import {shallow} from 'enzyme';

import DetailView from './DetailView';

const serviceDetails = {
    title:'Title'
};

describe('Component : DetailView', () =>{
  it('Renders without exploding',()=>{
    const wrapper = shallow(<DetailView {...serviceDetails}/>);
    expect(wrapper.contains(
      <div className="DetailView">
        <div>
          <div className="fieldKey">title</div>
          <div className="fieldValue">Title</div>
        </div>
      </div>
    ));
  });

});
