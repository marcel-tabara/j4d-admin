import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Card from '../comp/Card/Card.js';
import CardBody from '../comp/Card/CardBody.js';
import CardHeader from '../comp/Card/CardHeader.js';
import Breadcrumb from '../components/Breadcrumb';
import Keywords from '../components/Keywords';
import { usePost } from '../hooks/usePost';
import ReactMarkdownWithHtml from 'react-markdown/with-html';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

const useStyles = makeStyles(styles);

const Post = ({ id }) => {
  const classes = useStyles();
  const { post } = usePost({ id });

  const { title, created, markdown, _id, category, subcategory } = post;

  const renderPost = () => {
    return (
      <Card key={_id} className="noShadow">
        <CardHeader color="primary" className="noShadow">
          <h4 className={classes.cardTitleWhite}>{title}</h4>
          <Breadcrumb category={category} subcategory={subcategory} />
        </CardHeader>
        <CardBody>
          {Boolean(markdown) && (
            <ReactMarkdownWithHtml allowDangerousHtml>
              {markdown}
            </ReactMarkdownWithHtml>
          )}
          {/* <div className="keywords">
            <Keywords keywords={postMetaKeywords} />
          </div> */}
        </CardBody>
      </Card>
    );
  };

  return (
    <div>
      {renderPost()}
      <div className="date-more">
        <span>{new Date(created).toDateString()}</span>
      </div>
    </div>
  );
};

export default Post;
