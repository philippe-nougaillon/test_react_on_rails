import React from "react"
import PropTypes from "prop-types"

class Event extends React.Component {
  render () {
    return (
      <React.Fragment>
        <li>
          { `${ this.props.item.date } : ${ this.props.item.title }` } 
        </li>
      </React.Fragment>
    );
  }
}

Event.propTypes = {
  item: PropTypes.object
};

export default Event
