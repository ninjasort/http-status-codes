import AppDispatcher from '../dispatcher/app-dispatcher';
import AppConstants from '../constants/app-constants';

var AppActions = {

  search(query) {
    AppDispatcher.dispatch({
      actionType: AppConstants.SEARCH,
      query: query
    });
  }

};

export default AppActions;