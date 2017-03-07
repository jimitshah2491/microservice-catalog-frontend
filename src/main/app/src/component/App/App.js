import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../Fonts.css';

import NavInstance from '../Navigation';
import Header from '../Header';
import Search from '../SearchBox/SearchBox';

const App = ({children})=> {
    return (
      <div className="App">
        <Header/>
        <NavInstance/>
        <Search/>
        <div>
          {children}
        </div>
      </div>
    );
}

export default App;
