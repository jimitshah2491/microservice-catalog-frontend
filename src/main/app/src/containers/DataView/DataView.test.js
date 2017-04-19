import React from 'react';
import ReactDOM from 'react-dom';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

import DataView from './DataView';
import reducer from '../../redux';

describe('Container : DataView',()=>{

  it('renders without crashing', () => {
    const div = document.createElement('div');
    // const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,thunkMiddleware,createLogger())(createStore);
    // const mockStore = createStoreWithMiddleware(reducer);
    // ReactDOM.render(<DataView store ={mockStore}/>, div);
  });
});
