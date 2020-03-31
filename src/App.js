import React, { PureComponent } from 'react'
//import PropTypes from 'prop-types'
import './App.css'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import CombinedReducers from './redux/combinedReducers'
import initialState from './redux/initialState'

import { MuiThemeProvider } from 'material-ui/styles'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import AssetsTable from './AssetsTable'

const store = createStore(CombinedReducers, initialState)

class App extends PureComponent {
    render() {
      return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <Provider store={store}>
              <AssetsTable/>
          </Provider>
      </MuiThemeProvider>
    )
    }
}

export default App
