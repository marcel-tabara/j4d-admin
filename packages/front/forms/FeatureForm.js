import { featureActions, featureSelectors } from '@j4d-admin/services'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { navigate } from '@reach/router'
import React from 'react'
import { withTheme } from 'react-jsonschema-form'
import { useDispatch, useSelector } from 'react-redux'
import { Theme as MuiTheme } from 'rjsf-material-ui'
import { useAuth } from '../hooks/useAuth'
import '../react-draft-wysiwyg.css'

const FeatureForm = ({ id }) => {
  const dispatch = useDispatch()
  const Form = withTheme(MuiTheme)
  const feature = useSelector(featureSelectors.featuresByIdSelector)(id) || []

  useAuth()

  const schema = {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' },
      active: { type: 'boolean', default: false },
    },
  }

  const uiSchema = {}

  const onSubmit = ({ formData }) => {
    dispatch(
      featureActions.handleFeatures({
        operation: formData._id ? 'update' : 'create',
        modelType: 'feature',
        info: formData,
        query: { _id: formData._id },
      }),
    )
    navigate('/aFeatures')
  }

  return (
    <Container maxWidth="md">
      <Form
        schema={schema}
        onSubmit={onSubmit}
        uiSchema={uiSchema}
        formData={feature}
      >
        <div className="padd_top_bott">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default FeatureForm
