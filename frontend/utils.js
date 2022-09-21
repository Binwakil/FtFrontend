//import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
//import getConfig from './config'

//const nearConfig = getConfig(process.env.NODE_ENV || 'development')

import { CONTRACT_NAME, getConfig } from "./config";

const nearConfig = getConfig('development');

// Initialize contract & set global variables
export async function initContract () {
  // Initialize connection to the NEAR testnet
  //const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))
    let near = await window.nearApi.connect(nearConfig);

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new window.nearApi.WalletConnection(near);

  // Getting the Account ID. If still unauthorized, it's just empty string
  //window.accountId = window.walletConnection.getAccountId()

  window.account = await window.walletConnection.account()

  // Initializing our contract APIs by contract name and configuration
  /*window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['get_num'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['increment', 'decrement', 'reset'],
  })*/

  window.contract =  new window.nearApi.Contract(
    window.account, 
    CONTRACT_NAME, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['ft_total_supply', 'ft_balance_of'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['burn', 'tranfer_money', 'mint'],
  })
}; 

export const isLogging = () => {
    return window.walletConnection.isSignedIn();
}







export const getAccount = () => {
    return window.walletConnection.getAccountId();
    
}
 
 export function logout() {

    if (isLogging()) {

        window.walletConnection.signOut();
        window.location.reload();
        // reload page
        //window.location.replace(window.location.origin + window.location.pathname)
        
    } else {

        alert('already logout');
        
    }
 
}

export async function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.

  if (!isLogging()) {
    window.walletConnection.requestSignIn(CONTRACT_NAME);
  } else {
    //let me = await getAccount()
    alert(`already login please as ${getAccount()}`);
  }

  //window.walletConnection.requestSignIn(CONTRACT_NAME);
  
  
}


 export async function balances () {
    if (isLogging()) {

        //let nearConnection = await window.connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig));

        let nearConnection =await window.nearApi.connect(nearConfig);
        const account = await nearConnection.account(getAccount());
        let acc = await account.getAccountBalance();

        return acc;
        
    } else {
        
        return false;
    }
    
  }





 export async function total_supply () {

    if (isLogging()) {

        const ress = await window.contract.ft_total_supply() ;

        return ress; 
        
    }else{

        return 0;
    }
  }


  export async function your_token_bal () {

    if (isLogging()) {

        let accc = await getAccount();

        const ress = await window.contract.ft_balance_of({
            account_id: accc
        }) ;

        return ress; 
        
    }else{

        return 0;
    }
  }





  export async function mint_token (amount) {
    if (isLogging()) {

        let mint_funct = await window.contract.mint({
            
            args:{amount}
        }) ;

        return mint_funct;

        
    } else {
        
        return 0;
    }
  }


  export async function burn_token (amount){

    if (isLogging()) {

        let burn_funct = await window.contract.burn({
            args:{amount}
        });

        return burn_funct;
        
    } else {
        return 0;
    }
  }



  export async function tranfer_token (user, amount) {

    if (isLogging()) {

      let transfer_func = await window.contract.tranfer_money(
        
        {
          reciever: user, 
          amount: amount
        
        },
        "300000000000000", // attached GAS (optional)
        "1"
      );

      return transfer_func;
      
    } else {
      
      return 0;

    }
  }


 





