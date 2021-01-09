import {
  alertServiceReducer,
  categoryServiceReducer,
  commentServiceReducer,
  featureServiceReducer,
  keywordServiceReducer,
  likeServiceReducer,
  loginServiceReducer,
  modalServiceReducer,
  postServiceReducer,
  searchServiceReducer
} from '@j4d-admin/services'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  alertServiceReducer,
  categoryServiceReducer,
  commentServiceReducer,
  featureServiceReducer,
  loginServiceReducer,
  modalServiceReducer,
  postServiceReducer,
  searchServiceReducer,
  keywordServiceReducer,
  likeServiceReducer,
})

export default rootReducer
