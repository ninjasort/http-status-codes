import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AppStore from '../stores/app-store';

function getAppState() {
  return AppStore.getAll();
}

export default class CodeList extends React.Component {

  constructor(props) {
    super(props);

    this.state = getAppState();
  }

  componentDidMount() {
    AppStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState(getAppState());
  }

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
  }

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
          <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={500}>
            {items}
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    );
  }

}
