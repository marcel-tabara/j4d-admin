import routes from '@j4d-admin/reach-router'
import store from "@j4d-admin/redux-store"
import Container from "@material-ui/core/Container"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import "babel-polyfill"
import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import './styles.scss'

const theme = createMuiTheme({})
const testStore = store()

render(
  <Provider store={testStore}>
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        {routes}
      </Container>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
)
