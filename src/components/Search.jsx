import React from 'react';
import AppActions from '../actions/AppActions';

export default class Search extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }
  
  searchQuery(e) {
    AppActions.search(e.target.value);
  }

  render() {
    return (
      <input type="text" placeholder="Search for a status code..." onChange={this.searchQuery.bind(this)} />
    );
  }

}
