import React from "react"
import PropTypes from "prop-types"

const Search = ({ search, onSearch, children }) => {
  return (
    <React.Fragment>
      <label htmlFor="search">{ children }</label>
      <input  id="search" 
              type="text" 
              autoFocus={ true }
              value={ search }
              onChange={ onSearch }
      />
    </React.Fragment>
  );
};

Search.propTypes = {
  search: PropTypes.string,
  onSearch: PropTypes.func
};

export default Search
