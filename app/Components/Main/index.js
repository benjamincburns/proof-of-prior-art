import React, { Component } from 'react';
import { drizzleConnect } from 'drizzle-react';

class Main extends Component {

  render() {
    if (Object.keys(this.props.PriorArtToken.totalSupply).length == 0) {
      return <div/>
    } else {
      return (
        <div>
          { this.props.PriorArtToken.totalSupply }
        </div>
      )
    }
  }
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
