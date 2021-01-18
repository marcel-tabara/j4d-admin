import categorySaga from '@j4d-admin/services/categoryService/saga';
import keywordSaga from '@j4d-admin/services/keywordService/saga';
import postSaga from '@j4d-admin/services/postService/saga';
import { all, fork } from 'redux-saga/effects';

export default function* sagas() {
  yield all([categorySaga, postSaga, keywordSaga].map((saga) => fork(saga)));
}
