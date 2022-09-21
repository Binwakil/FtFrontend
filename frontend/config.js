// Once you deploy the contract to its final account, make sure to specify it here
//const CONTRACT_NAME = process.env.CONTRACT_NAME || 'change_this_account'; /* TODO: Change this to the deployed account */

//const CONTRACT_NAME = process.env.CONTRACT_NAME || 'akinyemisaheed.testnet';
const keyStore = new window.nearApi.keyStores.BrowserLocalStorageKeyStore()

export const CONTRACT_NAME = 'Ftbackend.techspace.testnet';

export function getConfig (env) {
  switch (env) {
    case 'production':
    case 'mainnet':
      return {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        keyStore,
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org',
        explorerUrl: 'https://explorer.mainnet.near.org'
      }
    case 'development':
    case 'testnet':
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        keyStore,
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org'
      }
    
    default:
      throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`)
  }
}


