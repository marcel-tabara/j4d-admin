import { categoryActions, categorySelectors } from '@j4d-admin/services';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { navigate } from '@reach/router';
import Form from '@rjsf/material-ui';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GenericFormSchemas } from '@mtutils/genericform';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(categorySelectors.categorySelector) || [];

  const schema = {
    type: 'object',
    properties: {
      categories: {
        type: 'array',
        uniqueItems: true,
        items: {
          type: 'object',
          required: ['categoryTitle'],
          properties: {
            seo: {
              type: 'object',
              properties:
                GenericFormSchemas.reactHelmet.definitions.ReactHelmet
                  .properties,
            },
            categoryId: { type: 'string' },
            categoryTitle: { type: 'string' },
            categoryActive: { type: 'boolean' },
            categoryMetaKeywords: { type: 'string' },
            categoryMetaTitle: { type: 'string', maxLength: 60 },
            categoryMetaDescription: { type: 'string', maxLength: 160 },
            categoryMetaRobots: { type: 'string' },
            categoryMetaViewport: {
              type: 'string',
              default: 'width=device-width, initial-scale=1.0',
            },
            categoryMetaCharset: { type: 'string', default: 'UTF-8' },
            subcategories: {
              type: 'array',
              uniqueItems: true,
              items: {
                type: 'object',
                required: ['subcategoryTitle'],
                properties: {
                  seoSub: {
                    type: 'object',
                    properties:
                      GenericFormSchemas.reactHelmet.definitions.ReactHelmet
                        .properties,
                  },
                  subcategoryId: { type: 'string' },
                  subcategoryTitle: { type: 'string' },
                  subcategoryActive: { type: 'boolean' },
                  subcategoryMetaKeywords: { type: 'string' },
                  subcategoryMetaTitle: { type: 'string', maxLength: 60 },
                  subcategoryMetaDescription: {
                    type: 'string',
                    maxLength: 160,
                  },
                  subcategoryMetaRobots: { type: 'string' },
                  subcategoryMetaViewport: {
                    type: 'string',
                    default: 'width=device-width, initial-scale=1.0',
                  },
                  subcategoryMetaCharset: { type: 'string', default: 'UTF-8' },
                },
              },
            },
          },
        },
      },
    },
  };

  const uiSchema = {
    categories: {
      items: {
        categoryMetaKeywords: {
          'ui:options': { label: true, rows: 5 },
          'ui:widget': 'textarea',
        },
        categoryMetaDescription: {
          'ui:options': { label: true, rows: 5 },
          'ui:widget': 'textarea',
        },
        subcategories: {
          items: {
            subcategoryMetaKeywords: {
              'ui:options': { label: true, rows: 5 },
              'ui:widget': 'textarea',
            },
            subcategoryMetaDescription: {
              'ui:options': { label: true, rows: 5 },
              'ui:widget': 'textarea',
            },
          },
        },
      },
    },
  };

  const onSubmit = ({ formData }) => {
    dispatch(
      categoryActions.handleCategories({
        operation: categories._id ? 'update' : 'create',
        modelType: 'category',
        info: formData,
        query: { _id: categories._id },
      }),
    );
    navigate('/aPosts');
  };

  return (
    <Container maxWidth="md">
      <Form
        schema={schema}
        onSubmit={onSubmit}
        uiSchema={uiSchema}
        formData={categories}
      >
        <div className="padd_top_bott">
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Categories;
