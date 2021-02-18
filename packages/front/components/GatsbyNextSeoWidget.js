import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { GenericForm } from '@mtutils/genericform';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    '& .MuiTextField-root': {
      margin: 0,
      width: '100%',
    },
    '& .MuiFormControl-root': {
      margin: 0,
      width: '100%',
    },
  },
}));

const GatsbyNextSeoWidget = ({ formData, onChange }) => {
  const classes = useStyles();
  return (
    <>
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
            initialData={formData.seo || {}}
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
            initialData={formData.seo || {}}
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
            initialData={formData.seo || {}}
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
            initialData={formData.seo || {}}
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
            initialData={formData.seo || {}}
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
            initialData={formData.seo || {}}
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
            initialData={formData.seo || {}}
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
            initialData={formData.seo || {}}
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
            initialData={formData.seo || {}}
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
            initialData={formData.seo || {}}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export { GatsbyNextSeoWidget };
