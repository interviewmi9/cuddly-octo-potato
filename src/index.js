import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import './index.css'
import App from './App'
import theme from './components/theme'
import createStore from './redux/createStore'
import { requestProducts } from './redux/products'

const store = createStore()
store.dispatch(requestProducts())

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
)
