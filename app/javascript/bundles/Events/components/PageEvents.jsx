import React, { useState } from "react"
import PropTypes from "prop-types"
import Search from "./Search"
import Events from "./Events"

const PageEvents = (props) => {

  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem('search') || ''      
  );

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    localStorage.setItem('search', event.target.value);
    console.log(event.target.value);
  };

  const searchedEvents = props.items.filter((item) => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  ); 

  return (
    <React.Fragment>
      <h1>{ props.title }</h1>

      <Search search={ searchTerm } onSearch={ handleChange }>
        Rechercher :
      </Search>

      { searchTerm && 
        <p>Searching for <strong>{ searchTerm }</strong>...</p>
      }

      <Events items={ searchedEvents } />
    </React.Fragment>
  );
}

PageEvents.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array
};

export default PageEvents
