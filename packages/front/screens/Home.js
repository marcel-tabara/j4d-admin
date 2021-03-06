import { postActions } from '@j4d-admin/services';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Pagination from '../components/Pagination';
import { useCategories } from '../hooks/useCategories';
import { usePosts } from '../hooks/usePosts';
import { useSearch } from '../hooks/useSearch';
import PostList from '../screens/PostList';

const limit = 20;

const Home = ({ cat, subcat, q }) => {
  const dispatch = useDispatch();

  useSearch({ q });

  const { posts, total } = usePosts({ cat, subcat, q });
  const { categories } = useCategories({ cat, subcat });

  const showPagination = posts.length < total;

  const onClickMore = useCallback(() => {
    dispatch(
      postActions.handlePosts({
        operation: 'read',
        modelType: 'post',
        info: {
          skip: posts.length,
          limit,
        },
        query: {},
      }),
    );
  }, [posts.length]);

  return (
    <Container maxWidth="xl">
      <Grid item xs={12}>
        <PostList
          posts={posts}
          cat={cat}
          subcat={subcat}
          categories={categories}
        />
        {showPagination && <Pagination onClickMore={onClickMore} />}
      </Grid>
    </Container>
  );
};

export default Home;
