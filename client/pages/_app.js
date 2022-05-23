//import '../styles/globals.css';
import '../styles/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import Caver from "caver-js";

function MyApp({ Component, pageProps }) {
  const [newKip17addr, setNewKip17Addr] = useState("0x85106722f1895bdE84398076902975F914ef6717");
  const [caver, setCaver] = useState();

  useEffect(() => {
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
        caver={caver}
        newKip17addr={newKip17addr}
        />
}

export default MyApp
