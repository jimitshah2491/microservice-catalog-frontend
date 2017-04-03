import React from 'react';
import './App.css';
import '../Fonts.css';

import NavInstance from '../layout/Navigation';
import Header from '../layout/Header';

/**
 * Basic Application Page comprising of Page Layout and Child pages
 * @param {Object} children - Page to be rendered as child
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
