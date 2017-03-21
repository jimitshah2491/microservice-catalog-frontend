import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../Fonts.css';

import NavInstance from '../layout/Navigation';
import Header from '../layout/Header';

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

export default App;
