import { createSlice } from '@reduxjs/toolkit'
import dropRight from 'lodash/dropRight'
import * as helper from './helper'
import * as selectors from './selectors'

const modalService = createSlice({
  name: 'modal',
  initialState: {
    modals: [],
  },
  reducers: {
    addModal: (state, action) => {
      state.modals = [...state.modals, action.payload]
    },
    removeModal: (state, action) => {
      state.modals = dropRight(state.modals, 1)
    },
  },
})

const { actions, reducer } = modalService

export { actions as modalActions }
export { reducer as modalServiceReducer }
export { selectors as modalSelectors }
export { helper as modalHelper }
