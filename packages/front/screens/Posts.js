import {
  commentActions,
  keywordActions,
  likeActions,
  postActions,
  postSelectors,
} from '@j4d-admin/services';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { DeleteRounded } from '@material-ui/icons';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import { navigate } from '@reach/router';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import { useCategories } from './../hooks/useCategories';
import { useKeywords } from './../hooks/useKeywords';

const addNew = () => navigate('/postform');

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(postSelectors.postSelector) || [];
  const { categories } = useCategories({});
  const { keywords: allKeywords } = useKeywords();

  useAuth();

  useEffect(() => {
    dispatch(
      postActions.handlePosts({
        operation: 'read',
        modelType: 'post',
        query: {},
      }),
    );
    dispatch(
      likeActions.handleLikes({
        operation: 'read',
        modelType: 'like',
        query: {},
      }),
    );
    dispatch(
      commentActions.handleComments({
        operation: 'read',
        modelType: 'comment',
        query: {},
      }),
    );
    dispatch(
      keywordActions.handleKeywords({
        operation: 'read',
        modelType: 'keyword',
        query: {},
      }),
    );
  }, []);

  const renderPosts = () => {
    if (posts.length === 0)
      return (
        <TableRow>
          <TableCell component="th" scope="row">
            No Posts
          </TableCell>
        </TableRow>
      );
    console.log('########## posts', posts);
    return posts.map(
      ({
        _id,
        seo,
        created,
        updated,
        category,
        subcategory,
        slug = 'aaa-bbb',
      }) => {
        const onTitleClick = useCallback(() => {
          navigate(`/${category}/${subcategory}/${_id}`);
        }, [category, subcategory, slug]);

        const onEdit = useCallback(() => {
          navigate(`/postform/${_id}`);
        }, [slug]);

        const onDelete = async (_id) => {
          const post = posts.find((post) => post._id === _id);
          const { keywords } = post;
          (keywords || []).map((keyword) => {
            const data = allKeywords.find((e) => e.name === keyword.name);
            if (data) {
              if (data.count >= 2) {
                dispatch(
                  keywordActions.handleKeywords({
                    operation: 'update',
                    modelType: 'keyword',
                    query: { _id: data._id },
                    info: { count: parseInt(data.count) - 1 },
                  }),
                );
              } else {
                dispatch(
                  keywordActions.handleKeywords({
                    operation: 'deleteOne',
                    modelType: 'keyword',
                    query: { _id: data._id },
                  }),
                );
              }
            }
          });
          await Promise.all([
            dispatch(
              likeActions.handleLikes({
                operation: 'deleteOne',
                modelType: 'like',
                query: { _id },
              }),
            ),

            dispatch(
              commentActions.handleComments({
                operation: 'deleteMany',
                modelType: 'comment',
                query: { _id },
              }),
            ),

            dispatch(
              postActions.handlePosts({
                operation: 'deleteOne',
                modelType: 'post',
                query: { _id },
              }),
            ),
          ]);
        };

        return (
          <TableRow key={_id}>
            <TableCell component="th" scope="row">
              <Link onClick={onTitleClick} className="generic_link">
                {seo.title}
              </Link>
              <div>
                {category} / {subcategory}
              </div>
              <div>{new Date(created).toDateString()}</div>
              <div>{seo.description}</div>
            </TableCell>
            <TableCell align="right">
              <DeleteRounded
                onClick={() => onDelete(_id)}
                color="primary"
                className="generic_link"
              />
              <EditIcon
                onClick={() => onEdit(_id)}
                color="primary"
                className="generic_link"
              />
            </TableCell>
          </TableRow>
        );
      },
    );
  };

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
          <TableBody>{renderPosts()}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Posts;