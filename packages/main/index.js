import Footer from '@j4d-admin/front/components/Footer';
import GenericModal from '@j4d-admin/front/screens/GenericModal';
import store from '@j4d-admin/redux-store';
import { categoryActions, postActions } from '@j4d-admin/services';
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './assets/css/material-dashboard-react.css';
import Main from './screens/Main';

const theme = createMuiTheme({});
const j4dStore = store();

j4dStore.dispatch(
  categoryActions.handleCategories({
    operation: 'read',
    modelType: 'category',
    query: {},
  }),
);
j4dStore.dispatch(
  postActions.getTotalsByCategory({
    operation: 'totalsByCategory',
  }),
);
j4dStore.dispatch(
  postActions.handlePosts({
    operation: 'read',
    modelType: 'post',
    info: {
      skip: 0,
      limit: 100,
    },
    query: {},
  }),
);

render(
  <Provider store={j4dStore}>
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Main />
        <Footer />
        <GenericModal />
      </Container>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
