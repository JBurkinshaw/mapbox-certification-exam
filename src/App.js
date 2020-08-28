/*

  App.js is used to control all React Context Providers

*/

import React from 'react'
import { Provider } from 'react-redux'
import store from './reducer/store'
import { ThemeProvider } from 'styled-components'
import { Grommet } from 'grommet'

import { Layout } from './components'
import theme from './theme'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Grommet theme={theme} full>
          <Layout />
        </Grommet>
      </ThemeProvider>
    </Provider>
  )
}

export default App
