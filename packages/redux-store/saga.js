import categorySaga from '@j4d-admin/services/categoryService/saga'
import commentSaga from '@j4d-admin/services/commentService/saga'
import featureSaga from '@j4d-admin/services/featureService/saga'
import keywordSaga from '@j4d-admin/services/keywordService/saga'
import likeSaga from '@j4d-admin/services/likeService/saga'
import postSaga from '@j4d-admin/services/postService/saga'
import { all, fork } from 'redux-saga/effects'

export default function* sagas() {
  yield all(
    [
      categorySaga,
      featureSaga,
      postSaga,
      commentSaga,
      keywordSaga,
      likeSaga,
    ].map((saga) => fork(saga)),
  )
}
