import React from 'react';
import Search from './components/Search';
import CodeList from './components/CodeList';

React.render(<Search />, document.querySelector('.search'));
React.render(<CodeList />, document.querySelector('.status-codes'));