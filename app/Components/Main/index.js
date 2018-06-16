import React, { Component } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types'

import { mintToken } from '../../Actions/mint';

import './main.css'


const pendingStatus = "🤔 Hmm, let me check on that...";
const failureStatus = "😦 Looks like someone else claimed this hash already!";
const mintedStatus = "🤩 You're officially an inventor!";

class Main extends Component {
  constructor(props, context) {
    super(props)
    
    this.contracts = context.drizzle.contracts
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let textArea = document.getElementById('priorArt');
    this.props.dispatch(mintToken(priorArt.value));
  }

  renderStatusLine() {
    let statusLine = '';

    if (this.props.mint.mintTokenStatus === 'success') {
      return <span>{ mintedStatus }</span>
    } else if (this.props.mintTokenStatus === 'pending') {
      return <span>{ pendingStatus }</span>
    } else if (this.props.mint.tokenExists) {
      return <span>{ failureStatus }</span>
    }

    return null;
  }

  renderSubmitButton() {
    if (this.props.mint.mintTokenStatus === 'pending') {
      return (<span id="spinner">🧐</span>);
    } else {
      return (<input type="submit" value="Submit" />);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="MainContainer">
        <h1> Prior Art 🎨</h1>
        <label>
          Enter some text to claim your original idea!
          <textarea id="priorArt" />
        </label>
        { this.renderStatusLine() }
        { this.renderSubmitButton() }
      </form>
    );
  }
}

Main.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    PriorArtToken: state.contracts.PriorArtToken,
    mint: state.mint
  };
};

const MainContainer = drizzleConnect(Main, mapStateToProps);
export default MainContainer;
