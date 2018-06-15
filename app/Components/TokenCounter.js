import React, { Component } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types'

class Main extends Component {
  constructor(props, context) {
    super(props)
    
    this.contracts = context.drizzle.contracts
  }

  render() {
    // Get the initial argsHash for this call.
    const totalSupplyKey = this.contracts.PriorArtToken.methods.totalSupply.cacheCall()

    // If the key we received earlier isn't in the store yet; the initial value is still being fetched.
    if(!(totalSupplyKey in this.props.PriorArtToken.totalSupply)) {
      return (
        <div>
          <p>Fetching...</p>
        </div>
      )
    }
    
    // The value is fetched, let's check the balance and use it!
    if (this.props.PriorArtToken.totalSupply[totalSupplyKey] === 0) {
      return (
        <div>
          <p>👨‍🌾 Looks like you ain't got no tokens!</p>
        </div>
      )
    } else {
      return (
        <div>
          🖼️ Our contract contains <strong>{ this.props.PriorArtToken.totalSupply[totalSupplyKey].value }</strong> pieces of art.
        </div>
      )
    }
  }
}

Main.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    PriorArtToken: state.contracts.PriorArtToken
  };
};

const MainContainer = drizzleConnect(Main, mapStateToProps);
export default MainContainer;
