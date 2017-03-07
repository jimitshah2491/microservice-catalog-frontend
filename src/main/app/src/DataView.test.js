import React from 'react';
import ReactDOM from 'react-dom';
import DataView from './DataView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DataView />, div);
});
