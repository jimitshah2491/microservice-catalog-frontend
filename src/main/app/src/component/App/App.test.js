import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { shallow } from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import App from './App';
import reducer from '../../redux';

describe("Component App :" , () =>{
  const wrapper = shallow(<App/>);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    const mockStore = configureStore([]);
    const store = mockStore({});
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,div);
  });

});
