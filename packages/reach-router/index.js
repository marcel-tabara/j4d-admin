import Loader from '@j4d-admin/front/components/Loader';
import { Router } from '@reach/router';
import React, { Suspense } from 'react';

const Home = React.lazy(() => import('@j4d-admin/front/screens/Home'));
const NotFound = React.lazy(() => import('@j4d-admin/front/screens/NotFound'));
const PostForm = React.lazy(() => import('@j4d-admin/front/forms/PostForm'));
const Post = React.lazy(() => import('@j4d-admin/front/screens/Post'));
const CategoriesForm = React.lazy(() =>
  import('@j4d-admin/front/forms/CategoriesForm'),
);
const Posts = React.lazy(() =>
  import('@j4d-admin/front/screens/AdminPostLists'),
);

const routes = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Router>
          <Home path="/" />
          <NotFound default path="notfound" />
          <CategoriesForm path="aCategories" />
          <PostForm path="postform/:id" />
          <PostForm path="postform/" />
          <Posts path="aPosts" />
          <Home path="/search/:q" />
          <Home path="/:cat" />
          <Home path="/:cat/:subcat" />
          <Post path="/:cat/:subcat/:id" />
        </Router>
      </Suspense>
    </div>
  );
};

export default routes;
