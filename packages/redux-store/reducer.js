import {
  alertServiceReducer,
  categoryServiceReducer,
  keywordServiceReducer,
  modalServiceReducer,
  postServiceReducer,
  searchServiceReducer,
} from '@j4d-admin/services';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  alertServiceReducer,
  categoryServiceReducer,
  modalServiceReducer,
  postServiceReducer,
  searchServiceReducer,
  keywordServiceReducer,
});

export default rootReducer;
