import React, { Component } from 'react';
import './SearchBar.css'

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
    };

    //this functionality
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  //search method passing props
  search() {
    this.props.onSearch(this.state.term);
  }

  //Sets the state of the search bar's term to the event target's value
  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  //handler for pressing enter and continue with search
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.refs.but.click();
    };
  }

  render() {
    return (
      <div className = "SearchBar">
        <input placeholder = "Enter A Song, Album, or Artist"
                onChange = {this.handleTermChange}
                onKeyPress = {(e) => this.handleKeyPress(e)}
                />
        <a onClick = {this.search} ref = "but">SEARCH</a>
      </div>
    )
  }
}

export default SearchBar;
