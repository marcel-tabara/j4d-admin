import { createSelector } from '@reduxjs/toolkit'

const features = (state) => state.featureServiceReducer.features
export const featureSelector = createSelector(features, (items) => items)
export const featuresByNameSelector = createSelector(
  [features],
  (res) => (name) => res.find((e) => e.name === name),
)
export const featuresByIdSelector = createSelector(
  [features],
  (res) => (featureId) => res.find((e) => e._id === featureId),
)
