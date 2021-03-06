//import '../styles/globals.css';
import '../styles/bootstrap.min.css';

import MainTitle from "./MainTitle";
import React, { useState, useEffect } from 'react';
import Image from 'next/image'

import Caver from "caver-js";
import Web3 from "web3";

function MyApp({ Component, pageProps }) {
  const [newKip17addr, setNewKip17Addr] = useState("0x754ac081585de505f3c48cd097e637f209b3062d");
  const [web3, setWeb3] = useState();
  const [caver, setCaver] = useState();

  const [Address, SetAddress] = useState("");
  const [walletType, setWalletType] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [ShowAddress, SetShowAddress] = useState("Login");

  const [CoinAmount, SetCoinAmount] = useState(0);
  const [CoinIcon, SetCoinIcon] = useState("/images/ethereum_icon.png");

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web = new Web3(window.ethereum);
        setWeb3(web);
        console.log("new Web3!");
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



  const kaikasLogin = async () => {
    const wallet = await window.klaytn.enable();
    const version = await window.klaytn.networkVersion;
    const selectedId = await window.klaytn.selectedAddress;

    if (selectedId != 'undefined') 
    {
      console.log("ID : " + selectedId);
      SetAddress(selectedId);

      SetCoinIcon("/images/klaytn-logo.png");
      window.sessionStorage.setItem('ID', selectedId);     

      const Coin = await caver.klay.getBalance(selectedId);
      const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(Coin));
      SetCoinAmount(balance);
      

      setWalletType("klay");

      const firstText = selectedId.substring(0, 8);
      const LastText = selectedId.slice(-6);
      const AllId = firstText + "......." + LastText;
      SetShowAddress(AllId);
    }
    else {
      Alert("?????? ????????? ??????");
      window.sessionStorage.removeItem('ID');
    }
  }

  const onMetaMask = async () => {
    if (window.ethereum) {
      if (window.ethereum.isMetaMask) {
        if (!isLogin) {
          window.sessionStorage.removeItem('ID');
          const selectedId = await ethereum.request({ method: 'eth_requestAccounts' });
          const chainId = await web3.eth.getChainId();
          const Coin = await web3.eth.getBalance(String(selectedId));
          const balance = await web3.utils.fromWei(Coin, 'ether');
          SetCoinAmount(balance);

          window.sessionStorage.setItem('ID', selectedId);
          console.log("MetaMask Account : " + selectedId);
          console.log("MetaMask chainId : " + chainId);
          console.log("MetaMask Coin : " + Coin);
          console.log(typeof selectedId);

          SetAddress(selectedId);
          

          const ID = JSON.stringify(selectedId);
          ID = ID.substr(2);
          ID = ID.substr(0, ID.length - 2);

          const firstText = ID.substring(0, 8);
          const LastText = ID.slice(-6);
          const AllId = firstText + "......." + LastText;
          SetShowAddress(AllId);

          if(chainId == 137 || chainId == 80001)
          {
            setWalletType("poly");
            SetCoinIcon("/images/polygon_icon.png");
          }
          else
          {
            setWalletType("eth");
            SetCoinIcon("/images/ethereum_icon.png");
          }

          //????????? ???????????? ???????????? ?????? 
          /*
          if (chainId == 137) 
          {
            const data =
              [{
                chainId: '0x89',
                chainName: 'Polygon Mainnet',
                nativeCurrency:
                {
                  name: 'MATIC',
                  symbol: 'MATIC',
                  decimals: 18
                },
                rpcUrls: ['https://polygon-rpc.com/'],
                blockExplorerUrls: ['https://polygonscan.com/'],
              }];

            const tx = await ethereum.request({ method: 'wallet_addEthereumChain', params: data }).catch();
            if (tx) 
            {
              console.log(tx);
            }
          }
          */
        }
        else {
          SetShowAddress("Login");
        }

      }
    }
  }

  //?????????????????? ?????? ???????????? ????????? ???????????? ?????????????????? ??????
  const onClickKaikas = () => {
    if (window.klaytn) {
      if (window.klaytn.isKaikas) {
        if (!isLogin) {
          kaikasLogin();
        }
        else {
          SetShowAddress("Login");
        }
      }

    }
  }

  return (
    <>
      <MainTitle
        onClickKaikas={onClickKaikas}
        onMetaMask={onMetaMask}
        web3={web3}
        caver={caver}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        setWalletType={setWalletType}
        Address={Address}
        SetAddress={SetAddress}
        ShowAddress={ShowAddress}
        SetShowAddress={SetShowAddress}
        CoinAmount={CoinAmount}
        CoinIcon={CoinIcon}
      />
      <Component
        Address={Address}
        walletType={walletType}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        web3={web3}
        caver={caver}
        newKip17addr={newKip17addr}
        onClickKaikas={onClickKaikas}
        onMetaMask={onMetaMask}        
        CoinAmount={CoinAmount}
        CoinIcon={CoinIcon}
      />
    </>
  );
}

export default MyApp;
