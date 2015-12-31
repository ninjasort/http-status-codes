import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/Search';
import CodeList from './components/CodeList';

ReactDOM.render(<Search />, document.querySelector('.search'));
ReactDOM.render(<CodeList />, document.querySelector('.status-codes'));