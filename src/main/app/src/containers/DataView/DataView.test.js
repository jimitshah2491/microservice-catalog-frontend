import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';

import DataView from './DataView';
import reducer from '../../redux';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const mockStore = createStore(reducer);
  ReactDOM.render(<DataView store ={mockStore}/>, div);
});
