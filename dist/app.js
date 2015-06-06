'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsSearch = require('./components/Search');

var _componentsSearch2 = _interopRequireDefault(_componentsSearch);

var _componentsCodeList = require('./components/CodeList');

var _componentsCodeList2 = _interopRequireDefault(_componentsCodeList);

_react2['default'].render(_react2['default'].createElement(_componentsSearch2['default'], null), document.querySelector('.search'));
_react2['default'].render(_react2['default'].createElement(_componentsCodeList2['default'], null), document.querySelector('.status-codes'));