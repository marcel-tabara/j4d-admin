import { featureActions } from '@j4d-admin/services'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import { DeleteRounded } from '@material-ui/icons'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import EditIcon from '@material-ui/icons/Edit'
import { navigate } from '@reach/router'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useFeatures } from '../hooks/useFeatures'

const addNew = () => navigate('/featureform')

const Features = () => {
  const dispatch = useDispatch()
  const { features } = useFeatures()

  const renderFeatures = () => {
    const onEdit = useCallback(
      (featureId) => {
        navigate(`/featureform/${featureId}`)
      },
      [name],
    )
    const onDelete = useCallback((featureId) => {
      dispatch(
        featureActions.handleFeatures({
          operation: 'deleteOne',
          modelType: 'feature',
          info: {},
          query: { _id: featureId },
        }),
      )
    }, [])
    return features.map((feature) => {
      const { _id: featureId, name, active } = feature

      return (
        <TableRow key={featureId}>
          <TableCell>{name}</TableCell>
          <TableCell>{active ? 'enabled' : 'disabled'}</TableCell>
          <TableCell align="right">
            <DeleteRounded
              onClick={() => onDelete(featureId)}
              color="primary"
              className="generic_link"
            />
            <EditIcon
              onClick={() => onEdit(featureId)}
              color="primary"
              className="generic_link"
            />
          </TableCell>
        </TableRow>
      )
    })
  }

  return (
    <>
      <div className="icon_wrapper">
        <AddCircleOutlineIcon
          onClick={addNew}
          color="primary"
          fontSize="large"
          className="generic_link"
        />
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>{renderFeatures()}</TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Features
