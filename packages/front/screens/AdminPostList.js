import {
  keywordActions,
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
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useKeywords } from '../hooks/useKeywords';
import get from 'lodash/get';
import { sanitizeString } from '../utils/common';

const addNew = () => navigate('/postform');

const AdminPostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(postSelectors.postSelector) || [];
  const { keywords: allKeywords = [] } = useKeywords();

  // useEffect(() => {
  //   dispatch(
  //     postActions.handlePosts({
  //       operation: 'read',
  //       modelType: 'post',
  //       query: {},
  //     }),
  //   );
  //   dispatch(
  //     keywordActions.handleKeywords({
  //       operation: 'read',
  //       modelType: 'keyword',
  //       query: {},
  //     }),
  //   );
  // }, [posts.length]);

  const renderPosts = () => {
    if (posts.length === 0) {
      return (
        <TableRow>
          <TableCell component="th" scope="row">
            No Posts
          </TableCell>
        </TableRow>
      );
    }

    return posts.map(
      ({ _id, seo, created, category, subcategory, slug = 'aaa-bbb' }) => {
        const onTitleClick = useCallback(() => {
          navigate(`/${category}/${subcategory}/${_id}`);
        }, [category, subcategory, slug]);

        const onEdit = () => navigate(`/postform/${_id}`);

        const onDelete = async (_id) => {
          const post = posts.find((post) => post._id === _id);
          const postKeywords =
            get(post, 'seo.meta', []).find((e) => e.name === 'keywords') || '';
          get(postKeywords, 'content', '')
            .split(',')
            .map((keyword) => {
              const data = allKeywords.find(
                (e) => e.name === sanitizeString(keyword),
              );
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
              postActions.handlePosts({
                operation: 'deleteOne',
                modelType: 'post',
                query: { _id },
              }),
            ),
          ]);
          navigate('/');
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

export default AdminPostList;
