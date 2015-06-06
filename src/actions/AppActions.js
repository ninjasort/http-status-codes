import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

var AppActions = {

  search(query) {
    AppDispatcher.dispatch({
      actionType: AppConstants.SEARCH,
      query: query
    });
  }

};

export default AppActions;