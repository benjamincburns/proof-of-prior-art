const WsProvider = require('web3-providers-ws')

let provider = new WsProvider('ws://100.115.92.195:8545')

provider.send({
  method: 'evm_mine',
  params: [],
  id: 1234
}, (err, result) => {
  if (err)
    throw err;
  process.exit()
})
