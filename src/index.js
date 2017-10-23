import React from 'react'
import ReactDOM from 'react-dom'
import Search from './components/search'
import CodeList from './components/codeList'

ReactDOM.render(<Search />, document.querySelector('.search'))
ReactDOM.render(<CodeList />, document.querySelector('.status-codes'))