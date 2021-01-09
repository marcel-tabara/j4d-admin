import { alertActions, callBackend, keywordActions } from '@j4d-admin/services'
import { put, takeLatest } from 'redux-saga/effects'

export function* watchHandleKeywords(action) {
  const { operation, modelType, info, query } = action.payload
  let response = {}
  try {
    if (operation !== 'read') {
      yield callBackend({
        operation,
        modelType,
        info,
        query,
      })

      response = yield callBackend({
        operation: 'read',
        modelType: 'keyword',
        info: { postId: info.postId },
        query: {},
      })
    } else {
      response = yield callBackend({
        operation,
        modelType,
        info,
        query,
      })
    }
    const { collection = [], total = 0 } = response.data
    yield put(keywordActions.setKeywords(collection))
  } catch (error) {
    yield put(alertActions.setAlert(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('keyword/handleKeywords', watchHandleKeywords)
}
