import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

it('AddMicroservice Form', () => {
  
});
