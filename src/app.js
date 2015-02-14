'use strict';

import http from 'http';
import React from 'react';
import EventEmitter from 'events';

let emitter = new EventEmitter();

let Search = React.createClass({

  getInitialState() {
    return {
      query: ''
    }
  },

  searchQuery(e) {
    this.setState({
      query: e.target.value
    });
    emitter.emit('search', e.target.value);
  },

  render() {
    return (
	<input type="text" placeholder="Search for a status code..." onChange={this.searchQuery}/>
      );
  }

});

let Component = React.createClass({

  filterItems(query) {
    let filtered = {};
    for(let item in this.state.items) {
      // check key ex. "100" or value ex "Not Found"
      if (item === query || (this.state.items[item].toLowerCase()).indexOf(typeof query === 'string' && query.toLowerCase()) !== -1) {
	filtered[item] = this.state.items[item];
      }
    }
    return filtered;
  },

  componentDidMount() {
    emitter.on('search', (e) => {
      this.setState({
	filtered: this.filterItems(e)
      });
    });
  },

  getInitialState() {
    let codes = http.STATUS_CODES;
    return {
      items: codes
    }
  },

  createList(codes) {
    let items = [];
    for (let code in codes) {
      items.push(
	  <li key={code} className="status-code__item">
	    <h3><a href={"http://httpstatus.es/" + code}>{code}</a></h3>
	    <p><a href={"http://httpstatus.es/" + code}>{codes[code]}</a></p>
	  </li>
	);
    }
    return items;
  },

  render() {
    let items;
    if (this.state.filtered) {
      items = this.createList(this.state.filtered);
    } else {
      items = this.createList(this.state.items)
    }
    return (
	<div>
	  <ul className="http-status-code__list">
	    {items}
	  </ul>
	</div>
      );
  }

});

React.render(<Search />, document.querySelector('.search'));
React.render(<Component />, document.querySelector('.status-codes'));