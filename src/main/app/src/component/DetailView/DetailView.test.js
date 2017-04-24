import React from 'react';
import {shallow} from 'enzyme';

import DetailView from './DetailView';

const serviceDetailsArr = [
  {title:'Title'}
];

const minProps ={
  serviceDetails:serviceDetailsArr
}
const wrapper = shallow(<DetailView {...minProps}/>);

describe('Component : DetailView', () =>{

  it('Expands component properly',()=>{

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
