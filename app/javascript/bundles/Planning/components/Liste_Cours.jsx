import React from "react"
import PropTypes from "prop-types"
import Cours from "./Cours";

const ListeCours  = ({ items }) => {

  const List = ({ items }) => (
    <div>
      { items.map((item) => (
          <Cours key={ item.id } item={ item } />
        ))
      }
    </div>
  );

  return (
    <React.Fragment>
      <List items={ items } />
    </React.Fragment>
  );
};

ListeCours.propTypes = {
  items: PropTypes.array
};

export default ListeCours