import { createSlice } from '@reduxjs/toolkit'
import * as selectors from './selectors'

const loginService = createSlice({
  name: 'backend',
  initialState: {
    authenticated: true,
  },
  reducers: {
    signin: (state, action) => {
      if (
        (action.payload.username === 'admin') &
        (action.payload.password === 'xxx')
      ) {
        state.authenticated = true
      }
    },
    signout: (state, action) => {
      state.authenticated = false
    },
  },
})

const { actions, reducer } = loginService
export { actions as loginActions }
export { reducer as loginServiceReducer }
export { selectors as loginSelectors }
