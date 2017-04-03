import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import App from './App';
import reducer from '../../redux';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={mockStore}>
      <App />
    </Provider>,div);
});
