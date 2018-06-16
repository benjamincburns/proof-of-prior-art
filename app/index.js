import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';

import { Drizzle, generateContractsInitialState } from 'drizzle';
import { DrizzleProvider, drizzleConnect } from 'drizzle-react';
import { LoadingContainer } from 'drizzle-react-components';
import DrizzleSagaConnector from './Components/drizzleSagaConnector';

import drizzleOptions from './drizzleOptions';
import rootReducer from './Reducers/root';
import rootSaga from './Sagas/root';

import Main from './Components/Main';

import './global.scss';

const initialState = {
  contracts: generateContractsInitialState(drizzleOptions)
}

const sagaMiddleware = createSagaMiddleware();

// for redux dev tools support
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      sagaMiddleware
    )
  )
)

ReactDOM.render(
  <DrizzleProvider options={drizzleOptions} store={store}>
    <DrizzleSagaConnector sagaMiddleware={sagaMiddleware} rootSaga={rootSaga}>
    <LoadingContainer>
      <Main/>
    </LoadingContainer>
  </DrizzleSagaConnector>
  </DrizzleProvider>,
  document.getElementById('root')
);
