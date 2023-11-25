const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = '<---your mnemonic--->';
module.exports = {


  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777"
    },
    sepolia: {
      networkCheckTimeout: 10000000,
      gas: 5500000,
      gasPrice: 20000000000,
      timeoutBlocks: 200,
      provider: () => new HDWalletProvider(mnemonic, 'https://sepolia.infura.io/v3/929b7f8f44b5430f8e0c610a6f1048e3', 0),
      network_id: "11155111",
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  mocha: {

  },

  compilers: {
    solc: {
      version: "0.8.7",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
};
