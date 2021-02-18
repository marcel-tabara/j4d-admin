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

const ReactHelmetSeoWidget = ({ formData, onChange }) => {
  const classes = useStyles();
  return (
    <Accordion key="reactHelmet">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="reactHelmet_panel-content"
        id="reactHelmet_panel-header"
      >
        <Typography className={classes.heading}>React Helmet</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <GenericForm
          onChange={(data) => onChange(data, 'seo')}
          type="reactHelmet"
          initialData={formData.seo || {}}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export { ReactHelmetSeoWidget };
