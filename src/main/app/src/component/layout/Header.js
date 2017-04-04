import React from 'react';
import logo from '../../logo.svg';

/**
 * Renders the branded Header at the top of the page
 */
const Header = () => (
  <div className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h2>Micro Service Catalog</h2>
    <div className="App-intro">
    </div>
  </div>
);

Header.displayName = 'Header'

export default Header;
