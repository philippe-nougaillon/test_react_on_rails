import React from "react"
import PropTypes from "prop-types"

const Event = ({ item }) => {
  return (
    <React.Fragment>
      <li>
        { `${ item.date } : ${ item.title }` } 
      </li>
    </React.Fragment>
  );
}

Event.propTypes = {
  item: PropTypes.object
};

export default Event
