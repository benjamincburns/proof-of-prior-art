import React, { Component, Children } from 'react';
import createSagaMiddleware from 'redux-saga';
import PropTypes from 'prop-types';

export default class DrizzleSagaConnector extends Component {
  constructor(props, context) {
    super(props)
    this.props.sagaMiddleware.run(
      this.props.rootSaga,
      context.drizzle
    );
  }

  render() {
    return Children.only(this.props.children)
  }
}

DrizzleSagaConnector.contextTypes = {
  drizzle: PropTypes.object
}

