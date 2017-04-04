import React from 'react';
import './App.css';
import '../Fonts.css';

import NavInstance from '../layout/Navigation';
import Header from '../layout/Header';

/**
 * This is the basic application page which comprises of Layout components and children components to be rendered.
 * @param {Object} children - Page to be rendered as a child component
 */
const App = ({children})=> {
  return (
    <div className="App">
      <Header/>
      <NavInstance/>
      <div>
        {children}
      </div>
    </div>
  );
}

App.displayName = 'App';

export default App;
