import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'

import { generateContractsInitialState } from 'drizzle';
import { DrizzleProvider, drizzleConnect } from 'drizzle-react';
import { LoadingContainer } from 'drizzle-react-components';

import drizzleOptions from './drizzleOptions';
import rootReducer from './Reducers/root';
import rootSaga from './Sagas/root';

import Main from './Components/Main'

ReactDOM.render(
  <DrizzleProvider options={drizzleOptions}>
    <LoadingContainer>
      <Main/>
    </LoadingContainer>
  </DrizzleProvider>,
  document.getElementById('root')
);
