import React from 'react';
import {shallow} from 'enzyme';

import DetailView from './DetailView';

const serviceDetailsArr = [
    {title:'Title'}
  ];

const minProps ={
  serviceDetails:serviceDetailsArr
}

describe('Component : DetailView', () =>{
  it('Renders without exploding',()=>{
    const wrapper = shallow(<DetailView {...minProps}/>);
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
