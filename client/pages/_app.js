//import '../styles/globals.css';
import '../styles/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import Caver from "caver-js";
import Web3 from "web3";

function MyApp({ Component, pageProps }) {
  const [newKip17addr, setNewKip17Addr] = useState("0x85106722f1895bdE84398076902975F914ef6717");
  const [web3, setWeb3] = useState();
  const [caver, setCaver] = useState();

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web = new Web3(window.ethereum);
        setWeb3(web);
      } catch (err) {
        console.log(err);
      }
    }    
    if (typeof window.klaytn !== "undefined") {
      try {
        const caver = new Caver(window.klaytn);
        setCaver(caver);
        console.log("new Caver!");
      } catch (err) {
        console.log(err);
      }
    }
  }, []);  

  return <Component 
        web3={web3}
        caver={caver}
        newKip17addr={newKip17addr}
        />
}

export default MyApp
