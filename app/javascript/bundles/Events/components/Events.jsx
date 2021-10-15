import React from "react"
import PropTypes from "prop-types"
import Event from "./Event"

const Events  = ({ items }) => {
  const List = ({ list }) => (
    <ul>
      { list.map((item) => (
          <Event key={ item.id } item={ item } />
        ))
      }
    </ul>
  );

  return (
    <React.Fragment>
      <p>
        Items: { items.length }
      </p>
      <List list={ items } />
    </React.Fragment>
  );
};

Events.propTypes = {
  items: PropTypes.array
};

export default Events