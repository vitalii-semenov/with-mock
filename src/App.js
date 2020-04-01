import React, {PureComponent} from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import CombinedReducers from './redux/combinedReducers';
import initialState from './redux/initialState';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import AssetsTable from './AssetsTable';

const store = createStore(CombinedReducers, initialState);

class App extends PureComponent {
  render() {
    return (
        <Provider store={store}>
            <div id="popup"/>
            <AssetsTable/>
        </Provider>
    );
  }
}

export default App;
