import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './SearchBox.css';
import '../Fonts.css';

const SearchBox = () =>  {
  // const handleChange = (e) => {
  //   this.setState({ value: e.target.value });
  // }

  const handleKeyPress = (e) => {
    this.props.filterRows(this.refs.searchbox.value);
  }
  return(
    <div className="Search-box">
      <input type="search" onKeyUp={handleKeyPress.bind(this)} id="search" placeholder="Search"/>
    </div>
  )
}

export default SearchBox;
