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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const PostForm = ({ id }) => {
  console.log('########## PostForm');
  const classes = useStyles();
  const dispatch = useDispatch();
  const { keywords } = useKeywords();
  const { record } = usePostForm({ id });

  const [formData, setFormData] = useState({
    category: record.category,
    created: record.created,
    markdown: record.markdown,
    priority: record.priority,
    seo: record.seo,
    subcategory: record.subcategory,
    updated: record.updated,
    _id: record._id,
    slug: record.slug || '',
  });
  console.log('########## formData', formData);

  const { categories } = useCategories({});
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

  const onChange = (data, type) => setFormData({ ...formData, [type]: data });

  const subcats = (getSubcategory(formData.category) || { enumIds: [] })
    .enumIds;

  const getSlug = () =>
    formData.seo.title
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
    <div>
      <div>
        <Accordion key="accordion_cat_subcat_priority">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              category / Subcategory / Provider
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.category}
                onChange={(e) => onChange(e.target.value, 'category')}
              >
                {catList.map((cat) => {
                  return (
                    <MenuItem value={cat} key={cat}>
                      {cat}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">SubCategory</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.subcategory}
                onChange={(e) => onChange(e.target.value, 'subcategory')}
              >
                {(subcats || ['']).map((subcat) => {
                  return (
                    <MenuItem value={subcat} key={subcat}>
                      {subcat}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Prority</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.priority || 1}
                onChange={(e) => onChange(e.target.value, 'priority')}
              >
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map(
                  (p) => {
                    return (
                      <MenuItem value={p} key={p}>
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
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              gatsbyNextSeo_AllSeoProps
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GenericForm
              onChange={(data) => onChange(data, 'seo')}
              type={'gatsbyNextSeo_AllSeoProps'}
              initialData={formData.seo}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion key="accordion_gatsbyNextSeo_CourseJsonLdProps">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              gatsbyNextSeo_CourseJsonLdProps
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GenericForm
              onChange={(data) => onChange(data, 'seo')}
              type={'gatsbyNextSeo_AllSeoProps'}
              initialData={formData.seo}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion key="accordion_gatsbyNextSeo_FAQJsonLdProps">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              gatsbyNextSeo_FAQJsonLdProps
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GenericForm
              onChange={(data) => onChange(data, 'seo')}
              type={'gatsbyNextSeo_FAQJsonLdProps'}
              initialData={formData.seo}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion key="accordion_gatsbyNextSeo_LogoJsonLdProps">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              gatsbyNextSeo_LogoJsonLdProps
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GenericForm
              onChange={(data) => onChange(data, 'seo')}
              type={'gatsbyNextSeo_LogoJsonLdProps'}
              initialData={formData.seo}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion key="accordion_gatsbyNextSeo_ProductJsonLdProps">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              gatsbyNextSeo_ProductJsonLdProps
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GenericForm
              onChange={(data) => onChange(data, 'seo')}
              type={'gatsbyNextSeo_ProductJsonLdProps'}
              initialData={formData.seo}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion key="accordion_gatsbyNextSeo_SocialProfileJsonLdProps">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              gatsbyNextSeo_SocialProfileJsonLdProps
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GenericForm
              onChange={(data) => onChange(data, 'seo')}
              type={'gatsbyNextSeo_SocialProfileJsonLdProps'}
              initialData={formData.seo}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion key="accordion_gatsbyNextSeo_LocalBusinessAddress">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              gatsbyNextSeo_LocalBusinessAddress
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GenericForm
              onChange={(data) => onChange(data, 'seo')}
              type={'gatsbyNextSeo_LocalBusinessAddress'}
              initialData={formData.seo}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion key="accordion_gatsbyNextSeo_CorporateContactJsonLdProps">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              gatsbyNextSeo_CorporateContactJsonLdProps
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GenericForm
              onChange={(data) => onChange(data, 'seo')}
              type={'gatsbyNextSeo_CorporateContactJsonLdProps'}
              initialData={formData.seo}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion key="accordion_gatsbyNextSeo_BreadcrumbJsonLdProps">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              gatsbyNextSeo_BreadcrumbJsonLdProps
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GenericForm
              onChange={(data) => onChange(data, 'seo')}
              type={'gatsbyNextSeo_BreadcrumbJsonLdProps'}
              initialData={formData.seo}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion key="accordion_gatsbyNextSeo_BlogJsonLdProps">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              gatsbyNextSeo_BlogJsonLdProps
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GenericForm
              onChange={(data) => onChange(data, 'seo')}
              type={'gatsbyNextSeo_BlogJsonLdProps'}
              initialData={formData.seo}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion key="accordion_markdown">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>markdown</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SimpleMDE
              value={formData.markdown}
              onChange={(data) => onChange(data, 'markdown')}
              height="500"
            />
          </AccordionDetails>
        </Accordion>
      </div>

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
