import { React, useState, useEffect } from 'react';


import { login, logout, balances, isLogging, getAccount, total_supply, your_token_bal, mint_token, burn_token, tranfer_token} from "./utils";

import './App.css';



function App() {

  let [myAcc, setMyAcc] = useState('');

  let [myNearBal, setMyNearBal] = useState('');

  let [tokenTotalsupply, setTokenTotalSupply] = useState('');

  let [yuortokenbal, setYourTokenBal] = useState('');

  let [mintInput, setMintInput] = useState('');

  let [burnInput, setBurnInput] = useState('');

  let [transferamout, setTransferamount] = useState('');

  let [transferusername, setTramsferusername] = useState('');

  


  // for logout ::::::::::::::::
  let out = () => {
    logout();
    window.location.reload();
  }


  // for signing :::::::::::::::
  
  let inside = () => {
    login()
  }
  
  

  // for get balance :::::::::::::::::
  let getbalance = async() => {
  
    let res = await balances();

    let available = res.available / (10**24);

    let realAvi = available.toFixed(5);
  
    //console.log(realAvi);

    setMyNearBal(realAvi);
  
  }



  // for get account or user namr ::::::::::

  let getusername = () => {

    let resAcc= getAccount();

    setMyAcc(resAcc);

  }



  // for get total supply token ::::::::::


  let get_total_supply = async () => {

    let ress = await total_supply();

    //console.log(ress);

    setTokenTotalSupply(ress)
  }



  // for your token balanc
  let get_your_token_bal = async() => {

    let tokenbal = await your_token_bal();

    //console.log(tokenbal);

    setYourTokenBal(tokenbal);
  }


  // for minting of token

  let minting_token = async () => {
    let mintvalue = parseInt(mintInput);

    let mintedToken = await mint_token(mintvalue);

    let result = `${mintedToken}WAL was minted`;
    
    alert(result);
    window.location.reload();
  }



  // for burning of token 

  let burning_token = async () => {

    let burnvale = parseInt(burnInput);

    let burned = await burn_token(burnvale);

    let result = `${burned}WAL was burned`;

    alert(result);
    window.location.reload();
  }


  // for transfer of money 

  let transfering_token = async () => {

    let transvalue = transferamout;

    let transuser = transferusername.toString();

    let transfered = await tranfer_token(transuser, transvalue);
    
    //console.log(transfered);

    let result = `${transfered}WAL was transfered to ${transuser}`;

    alert(result);
    window.location.reload();
  }





  



  useEffect(() => {

    getusername();
    getbalance();
    get_total_supply();
    get_your_token_bal();

  }, [inside])




  if (!isLogging()) {
    
    return(
      <>
        <section id='container'>

          <div className='out'>
            <button onClick={() => inside() }>login</button>
          </div>

        </section>
      
      </>
    )
  }
  return (
    <>
      <section id='container'>

        <div className='out'>
          <button onClick={() => out()}>logout</button>
        </div>

        <div className='account'>
           <div className='def'>
              <h3>account:</h3>
              <p>{myAcc}</p>
           </div>

           <div className='def'>
              <h3>balance:</h3>
              <p>{myNearBal} NEAR</p>
           </div>
        </div>

        <div className='token'>
          
          <div className='def'>
              <h3>EPT Token Total Supply:</h3>
              <p>{tokenTotalsupply} EPT</p>
           </div>

           <div className='def'>
              <h3> your EPT token balance:</h3>
              <p>{yuortokenbal} EPT</p>
           </div>

        </div>

        <div className='mint'>
            <input type="number" name="mint" id="mint"  value={mintInput} onChange={(e) => setMintInput(e.target.value)} placeholder="enter amount"/>
            <button onClick={() => minting_token() }>mint token</button>
        </div>

        <div className='mint'>
          <input type="number" name="burn" id="burn" value={burnInput} onChange={(e) => setBurnInput(e.target.value)} placeholder="enter amount"/>
          <button onClick={()=> burning_token()}>burn</button>
        </div>

        <div className='transfr'>
          <h3>transfer token</h3>
          <div>
            <input type="text" placeholder='user name' value={transferusername} onChange={(e) => setTramsferusername(e.target.value)}/>
          </div>

          <div>
            <input type="number" name="" id="" placeholder='enter amount' value={transferamout} onChange={(e) => setTransferamount(e.target.value)}/>
          </div>

          <button onClick={() => transfering_token()}>transfer</button>
        </div>


      </section>
    </>
  );
}

export default App;
