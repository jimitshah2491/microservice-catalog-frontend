import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';

import App from './App';
import reducer from '../../redux';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const mockStore = createStore(reducer);
  ReactDOM.render(

    <Provider store={mockStore}>
      <App />
    </Provider>,div);
});
