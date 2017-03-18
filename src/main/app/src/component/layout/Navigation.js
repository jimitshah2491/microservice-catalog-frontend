import React from 'react'
import {Nav , NavItem} from 'react-bootstrap'

const navInstance =() => {
  return(
    <Nav bsStyle="pills" activeKey={1}>
      <NavItem eventKey={1} href="/">Home</NavItem>
      <NavItem eventKey={2} href="/addService" title="Item">Add MicroService</NavItem>
    </Nav>
  );
}

export default navInstance;
