/*

  App.js is used to control all React Context Providers

*/

import React, { useMemo, useState } from 'react'
import { Provider } from 'react-redux'
import store from './reducer/store'
import { ThemeProvider } from 'styled-components'
import { Grommet } from 'grommet'
import { generate } from 'grommet/themes/base';
import { deepMerge } from 'grommet/utils';
import { hpe } from 'grommet-theme-hpe';

import { Layout } from './components'
import './App.css'

function App() {
  const [baseSize] = useState(24);
  const [themeName] = useState(hpe);

  const theme = useMemo(
    () => deepMerge(generate(baseSize), themeName),
    [baseSize, themeName],
  );
  

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
