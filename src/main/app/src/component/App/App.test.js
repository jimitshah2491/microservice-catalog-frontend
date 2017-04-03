import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import reducer from '../../redux';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const mockStore = createStore(reducer);
  ReactDOM.render(

    <Provider store={mockStore}>
      <App />
    </Provider>,div);
});
