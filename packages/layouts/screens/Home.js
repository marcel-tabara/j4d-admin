import { postActions } from '@j4d-admin/services';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { GenericForm, genericFormData } from '@mtutils/genericform';
import MarkdownEditor from '@uiw/react-markdown-editor';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Home = props => {
  const classes = useStyles();
  const [nextSeo, setNextSeo] = useState({})
  const [, triggerRefresh] = useState(false)
  const [markdown, setMarkdown] = useState( '# This is a H1  \n## This is a H2  \n###### This is a H6')

  const formData = {}

  const dispatch = useDispatch()

  useEffect(() => {
    setNextSeo(genericFormData)
  }, [genericFormData])
  console.log('########## nextSeo', nextSeo)
  const onSubmit = () => {
    const info = {
      ...formData,
      markdown,
      seo: nextSeo,
      created: formData._id ? formData.created : Date.now(),
      updated: Date.now() ,
    }

    console.log('########## info', info)
    dispatch(
      postActions.handlePosts({
        operation: formData._id ? 'update' : 'create',
        modelType: 'post',
        info,
        query: { _id: formData._id },
      }),
    )
  }
  const updateMarkdown = (editor, data, value) => setMarkdown(value)
  const onNextSeoChange = () => triggerRefresh()

  return (
    <div className={classes.root}>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>NextSeo</Typography>
      </AccordionSummary>
      <AccordionDetails expanded='true'>
        <GenericForm initialData={nextSeo} cb={onNextSeoChange} type='nextSeo' />
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography className={classes.heading}>Markdown Editor</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <MarkdownEditor
          value={markdown}
          onChange={updateMarkdown}
          width={800}
          height={500}
        />
      </AccordionDetails>
    </Accordion>
    <Button type='submit' variant="contained" color="primary" style={{marginTop: 20}} onClick={onSubmit}>Submit</Button>
  </div>
  )
}

export default Home
