import { postActions, postSelectors } from '@j4d-admin/services';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const usePost = ({ id }) => {
  const dispatch = useDispatch();
  const post = useSelector(postSelectors.postBySlugSelector)(id) || {};
  // const { _id, created } = post;

  // useEffect(() => {
  //   if (!_id) {
  //     dispatch(
  //       postActions.handlePosts({
  //         operation: 'read',
  //         modelType: 'post',
  //         query: { _id },
  //       }),
  //     );
  //   } else {
  //     dispatch(
  //       postActions.handlePosts({
  //         operation: 'read',
  //         modelType: 'post',
  //         query: {
  //           created: {
  //             $lte: created,
  //           },
  //         },
  //       }),
  //     );
  //   }
  // }, [_id, created]);

  return {
    post,
  };
};
