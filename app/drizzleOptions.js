import PriorArtToken from './../build/contracts/PriorArtToken.json';

const drizzleOptions = {
  contracts: [
    PriorArtToken
  ],
  web3: {
    fallback: {
      type: 'ws',
      url: 'ws://100.115.92.195:8545'
    }
  }
};

export default drizzleOptions;

