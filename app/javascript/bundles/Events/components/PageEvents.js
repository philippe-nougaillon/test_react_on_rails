import React from "react"
import PropTypes from "prop-types"
import Search from "../components/Search"
import Events from "../components/Events"

class PageEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '' };
  }

  render () {
    const handleChange = (event) => {
      this.setState({ searchTerm: event.target.value });
      console.log(event.target.value);
    };

    const searchedEvents = this.props.items.filter((item) => 
          item.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    ); 
  
    return (
      <React.Fragment>
        <h1>{ this.props.title }</h1>

        <Search search={ this.state.searchTerm } onSearch={ handleChange }>
          Rechercher :
        </Search>

        { this.state.searchTerm && 
            <p>Searching for <strong>{ this.state.searchTerm }</strong>...</p>
        }

        <Events items={ searchedEvents } />

      </React.Fragment>
    );
  }
}

PageEvents.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array
};

export default PageEvents
