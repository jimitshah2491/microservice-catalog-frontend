import React from 'react';

import './SearchBox.css';
import '../Fonts.css';

import {filterText} from '../../redux/modules/catalog';

/**
 * [SearchBox description]
 */
const SearchBox = (props) =>  {
  const {dispatch} = props;
  // const handleChange = (e) => {
  //   this.setState({ value: e.target.value });
  // }

  const handleKeyPress = (e) => {
    dispatch(filterText(e.target.value));
  }
  return(
    <div className="Search-box">
      <input type="search" onKeyUp={handleKeyPress.bind(this)} id="search" placeholder="Search"/>
    </div>
  )
}

SearchBox.displayName = 'SearchBox';

export default SearchBox;
