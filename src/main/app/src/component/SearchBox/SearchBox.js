import React from 'react';

import './SearchBox.css';
import '../Fonts.css';

import {filterText} from '../../redux/modules/catalog';

/**
 * Searchbox Component Used to filter data and search microservice.
 */
const SearchBox = (props) =>  {
  const {dispatch} = props;
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
