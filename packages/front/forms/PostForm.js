/* eslint-disable react/prop-types */
import { keywordActions, postActions } from '@j4d-admin/services';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { GenericForm } from '@mtutils/genericform';
import { navigate } from '@reach/router';
import 'easymde/dist/easymde.min.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import SimpleMDE from 'react-simplemde-editor';
import { useCategories } from '../hooks/useCategories';
import { useKeywords } from '../hooks/useKeywords';
import { usePostForm } from '../hooks/usePostForm';
import { sanitizeString } from '../utils/common';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '90%',
      padding: 0,
      margin: 0,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  },
}));

const PostForm = ({ id }) => {
  console.log('########## PostForm');
  const classes = useStyles();
  const dispatch = useDispatch();
  const { categories } = useCategories({});
  const { keywords } = useKeywords();
  const { record } = usePostForm({ id });

  const [formData, setFormData] = useState({
    category: record.category || '',
    created: record.created || new Date(),
    markdown: record.markdown || '',
    priority: record.priority || '',
    seo: record.seo,
    subcategory: record.subcategory || '',
    updated: record.updated || new Date(),
    _id: record._id,
    slug: record.slug || '',
    title: record.title || '',
    description: record.description || '',
  });
  console.log('########## formData', formData);

  const catList = categories.map((cat) => cat.categoryId);
  const getSubcategory = (catId) => {
    if (catId) {
      const selectedCat = categories.find(
        (category) => category.categoryId.toLowerCase() === catId.toLowerCase(),
      ) || { subcategories: [] };

      const enumIds = selectedCat.subcategories.map((e) => e.subcategoryId);
      const enumTitles = selectedCat.subcategories.map(
        (e) => e.subcategoryTitle,
      );
      return {
        enumIds,
        enumTitles,
      };
    }
  };

  const upsertKeywords = ({ formData }) => {
    (formData.postMetaKeywords || []).map((k) => {
      const sanitizedKeyword = sanitizeString(k.name);
      const existingKeyword = keywords.find(
        (e) => sanitizeString(e.name) === sanitizedKeyword,
      );

      if (!existingKeyword || (existingKeyword.count === 1 && record._id)) {
        dispatch(
          keywordActions.handleKeywords({
            operation: 'create',
            modelType: 'keyword',
            info: { name: sanitizedKeyword, count: 1 },
          }),
        );
      } else {
        const newCount = record._id ? 0 : 1;
        dispatch(
          keywordActions.handleKeywords({
            operation: 'update',
            modelType: 'keyword',
            info: {
              count: parseInt(existingKeyword.count) + newCount,
            },
            query: { _id: existingKeyword._id },
          }),
        );
      }
    });
  };

  const showKeywords = () =>
    keywords.map((keyword) => keyword.name.concat(', '));

  const onChange = (data, type) =>
    setFormData({
      ...formData,
      [type]: data,
    });

  const subcats = (getSubcategory(formData.category) || { enumIds: [] })
    .enumIds;
  const getSlug = () =>
    formData.title
      //.replace(/[^\w\s]/gi, '')
      .split(' ')
      .join('-')
      .toLowerCase()
      .trim();

  const onSubmit = () => {
    // const contentState = editorState.getCurrentContent()
    // if (!record._id) {
    //   upsertKeywords({ formData })
    // } else {
    //   cleanKeywords()
    //   upsertKeywords({ formData })
    // }

    dispatch(
      postActions.handlePosts({
        operation: formData._id || false ? 'update' : 'create',
        modelType: 'post',
        info: {
          ...formData,
          created: formData._id ? formData.created : Date.now(),
          updated: Date.now(),
          slug: getSlug() || '',
        },
        query: { _id: formData._id },
      }),
    );
    navigate('/');
  };

  return (
    <div className={classes.root}>
      <div>
        <Accordion key="accordion_cat_subcat_prior">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="cat_subcat_prior-content"
            id="cat_subcat_priority-header"
          >
            <Typography className={classes.heading}>
              Category - Subcategory - Priority
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl className={classes.formControl}>
              <InputLabel id="cat_subcat_prior-category-label">
                Category
              </InputLabel>
              <Select
                labelId="cat_subcat_prior-category-select-label"
                id="cat_subcat_prior-category-select"
                value={formData.category}
                onChange={(e) => onChange(e.target.value, 'category')}
              >
                {catList.map((cat) => {
                  return (
                    <MenuItem value={cat} key={`category_${cat}`}>
                      {cat}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="cat_subcat_prior-subcategory-label">
                SubCategory
              </InputLabel>
              <Select
                labelId="cat_subcat_prior-subcategory-select-label"
                id="cat_subcat_prior-subcategory-select"
                value={formData.subcategory}
                onChange={(e) => onChange(e.target.value, 'subcategory')}
              >
                {subcats.map((subcat) => {
                  return (
                    <MenuItem value={subcat} key={`subcategory_${subcat}`}>
                      {subcat}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="cat_subcat_prior-priority-select-label">
                Prority
              </InputLabel>
              <Select
                labelId="cat_subcat_prior-priority-select-label"
                id="cat_subcat_prior-priority-select"
                value={formData.priority}
                onChange={(e) => onChange(e.target.value, 'priority')}
              >
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map(
                  (p) => {
                    return (
                      <MenuItem value={p} key={`priority_${p}`}>
                        {p}
                      </MenuItem>
                    );
                  },
                )}
              </Select>
            </FormControl>
          </AccordionDetails>
        </Accordion>
        <Accordion key="accordion_gatsbyNextSeo_AllSeoProps">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="gatsbyNextSeo_AllSeoProps_panel-content"
            id="gatsbyNextSeo_AllSeoProps_panel-header"
          >
            <Typography className={classes.heading}>
              gatsbyNextSeo_AllSeoProps
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GenericForm
              onChange={(data) => onChange(data, 'seo')}
              type="gatsbyNextSeo_AllSeoProps"
              initialData={formData.seo}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion key="accordion_gatsbyNextSeo_CourseJsonLdProps">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="gatsbyNextSeo_CourseJsonLdProps-panel-content"
            id="gatsbyNextSeo_CourseJsonLdProps-panel-header"
          >
            <Typography className={classes.heading}>
              gatsbyNextSeo_CourseJsonLdProps
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GenericForm
              onChange={(data) => onChange(data, 'seo')}
              type="gatsbyNextSeo_AllSeoProps"
              initialData={formData.seo}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion key="accordion_gatsbyNextSeo_FAQJsonLdProps">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="gatsbyNextSeo_FAQJsonLdProps-panel-content"
            id="gatsbyNextSeo_FAQJsonLdProps-panel-header"
          >
            <Typography className={classes.heading}>
              gatsbyNextSeo_FAQJsonLdProps
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GenericForm
              onChange={(data) => onChange(data, 'seo')}
              type="gatsbyNextSeo_FAQJsonLdProps"
              initialData={formData.seo}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion key="accordion_gatsbyNextSeo_LogoJsonLdProps">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="gatsbyNextSeo_LogoJsonLdProps-panel-content"
            id="gatsbyNextSeo_LogoJsonLdProps-panel-header"
          >
            <Typography className={classes.heading}>
              gatsbyNextSeo_LogoJsonLdProps
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GenericForm
              onChange={(data) => onChange(data, 'seo')}
              type="gatsbyNextSeo_LogoJsonLdProps"
              initialData={formData.seo}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion key="accordion_gatsbyNextSeo_ProductJsonLdProps">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="gatsbyNextSeo_ProductJsonLdProps-panel-content"
            id="gatsbyNextSeo_ProductJsonLdProps-panel-header"
          >
            <Typography className={classes.heading}>
              gatsbyNextSeo_ProductJsonLdProps
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GenericForm
              onChange={(data) => onChange(data, 'seo')}
              type="gatsbyNextSeo_ProductJsonLdProps"
              initialData={formData.seo}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion key="accordion_gatsbyNextSeo_SocialProfileJsonLdProps">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="gatsbyNextSeo_SocialProfileJsonLdProps-panel-content"
            id="gatsbyNextSeo_SocialProfileJsonLdProps-panel-header"
          >
            <Typography className={classes.heading}>
              gatsbyNextSeo_SocialProfileJsonLdProps
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GenericForm
              onChange={(data) => onChange(data, 'seo')}
              type="gatsbyNextSeo_SocialProfileJsonLdProps"
              initialData={formData.seo}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion key="accordion_gatsbyNextSeo_LocalBusinessAddress">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="gatsbyNextSeo_LocalBusinessAddress-panel-content"
            id="gatsbyNextSeo_LocalBusinessAddress-panel-header"
          >
            <Typography className={classes.heading}>
              gatsbyNextSeo_LocalBusinessAddress
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GenericForm
              onChange={(data) => onChange(data, 'seo')}
              type="gatsbyNextSeo_LocalBusinessAddress"
              initialData={formData.seo}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion key="accordion_gatsbyNextSeo_CorporateContactJsonLdProps">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="gatsbyNextSeo_CorporateContactJsonLdProps-panel-content"
            id="gatsbyNextSeo_CorporateContactJsonLdProps-panel-header"
          >
            <Typography className={classes.heading}>
              gatsbyNextSeo_CorporateContactJsonLdProps
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GenericForm
              onChange={(data) => onChange(data, 'seo')}
              type="gatsbyNextSeo_CorporateContactJsonLdProps"
              initialData={formData.seo}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion key="accordion_gatsbyNextSeo_BreadcrumbJsonLdProps">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="gatsbyNextSeo_BreadcrumbJsonLdProps-panel-content"
            id="gatsbyNextSeo_BreadcrumbJsonLdProps-panel-header"
          >
            <Typography className={classes.heading}>
              gatsbyNextSeo_BreadcrumbJsonLdProps
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GenericForm
              onChange={(data) => onChange(data, 'seo')}
              type="gatsbyNextSeo_BreadcrumbJsonLdProps"
              initialData={formData.seo}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion key="accordion_gatsbyNextSeo_BlogJsonLdProps">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="gatsbyNextSeo_BlogJsonLdProp-panel-content"
            id="gatsbyNextSeo_BlogJsonLdProp-panel-header"
          >
            <Typography className={classes.heading}>
              gatsbyNextSeo_BlogJsonLdProps
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GenericForm
              onChange={(data) => onChange(data, 'seo')}
              type="gatsbyNextSeo_BlogJsonLdProps"
              initialData={formData.seo}
            />
          </AccordionDetails>
        </Accordion>
      </div>

      <h2>Markdown</h2>
      <div className="paddTopBott">
        <TextField
          required
          id="standard-required"
          label="Title"
          value={formData.title}
          onChange={(e) => onChange(e.target.value, 'title')}
          variant="outlined"
        />
      </div>
      <div className="paddTopBott">
        <TextField
          id="filled-multiline-flexible"
          label="Description"
          multiline
          rowsMax={40}
          value={formData.description}
          onChange={(e) => onChange(e.target.value, 'description')}
          variant="outlined"
          width={1200}
        />
      </div>
      <SimpleMDE
        value={formData.markdown}
        onChange={(data) => onChange(data, 'markdown')}
        height="500"
        width="1200"
      />
      <button
        variant="contained"
        color="primary"
        type="submit"
        onClick={onSubmit}
        style={{ marginTop: '2rem' }}
      >
        Submit
      </button>
    </div>
  );
};

export default PostForm;
