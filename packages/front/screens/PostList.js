/* eslint-disable react/prop-types */
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { navigate } from '@reach/router';
import React from 'react';
import Card from '../comp/Card/Card.js';
import CardBody from '../comp/Card/CardBody.js';
import CardHeader from '../comp/Card/CardHeader.js';
import Breadcrumb from '../components/Breadcrumb';
import Keywords from '../components/Keywords';

const styles = {
  typo: {
    paddingLeft: '25%',
    marginBottom: '40px',
    position: 'relative',
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: '10px',
    top: '10px',
    color: '#c0c1c2',
    display: 'block',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '13px',
    left: '0',
    marginLeft: '20px',
    position: 'absolute',
    width: '260px',
  },
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

const PostList = ({ posts }) => {
  console.log('########## posts-PostList', posts);
  const classes = useStyles();
  const renderPosts = () => {
    return posts.map((post) => {
      const {
        _id: postId,
        title,
        postUrl,
        longDescription,
        created,
        category,
        subcategory,
        keywords,
      } = post;

      const onTitleClick = () =>
        navigate(`/${category}/${subcategory}/${postUrl}`);

      return (
        <Card key={postId}>
          <CardHeader color="primary">
            <Link className="generic_link" onClick={onTitleClick}>
              <h4 className={classes.cardTitleWhite}>{title}</h4>
              <h5 className={classes.cardTitleWhite}>{created}</h5>
            </Link>
            <Breadcrumb category={category} subcategory={subcategory} />
          </CardHeader>
          <CardBody>
            <div>
              <div>{longDescription}</div>
              <div className="keywords">
                <Keywords keywords={keywords} />
              </div>
            </div>
          </CardBody>
        </Card>
      );
    });
  };

  return <>{renderPosts()}</>;
};

export default PostList;
