import http from 'http';
import AppDispatcher from '../dispatcher/app-dispatcher';
import EventEmitter from 'events';
import AppConstants from '../constants/app-constants';

let AppStore = Object.assign({}, EventEmitter.prototype, {

  items: http.STATUS_CODES,
  
  filtered: null,

  getAll() {
    return {
      items: this.items,
      filtered: this.filtered
    };
  },

  filterItems(query) {
    let filtered = {};
    for(let item in this.items) {
      if (item === query || (this.items[item].toLowerCase()).indexOf(typeof query === 'string' && query.toLowerCase()) !== -1) {
        filtered[item] = this.items[item];
      }
    }
    return filtered;
  },

  search(query) {
    this.filtered = this.filterItems(query);
  },

  emitChange() {
    this.emit('change');
  },

  addChangeListener(callback) {
    this.on('change', callback);
  },

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

});

AppDispatcher.register(function (action) {

  switch(action.actionType) {
    case AppConstants.SEARCH:
      AppStore.search(action.query);
      AppStore.emitChange();
      break;
  }

});

export default AppStore;