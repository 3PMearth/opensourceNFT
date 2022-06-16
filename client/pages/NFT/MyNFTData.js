import React, { useState, useEffect } from 'react';
import MainTitle from "../MainTitle";
import kip17Abi from "../../components/kip17Abi";
import erc721Abi from "../../components/erc721Abi";
//import erc1155Abi from "../../components/erc1155Abi";
import Mystyles from "../../styles/mynft.module.css";
import FireBaseInit from '../../components/FireBaseInit';
import Caver from "caver-js";
import axios from "axios";

const MyNFTData = ({ Address, walletType, web3, caver, newKip17addr }) => {
  const [nftlist, setNftlist] = useState([]);

  const [GameNFTlist, setGameNFTlist] = useState([]);
  const [Showlist, setShowlist] = useState([]);
  const [isGameNFT, setGameNFT] = useState(false);

  //Firebase Database 
  const [Info, setInfos] = useState({
    Contract: '',
    GameItemValue: -1,
    Token: -1
  });

  useEffect(() => {
    SaveMyToken();
    //KasMigrate();

  }, []);

  const KasMigrate = async () => 
  {
    //https://polygon-mainnet.public.blastapi.io //폴리곤 노드
    //https://polygon-rpc.com                    //폴리곤 노드
    //https://eth-mainnet.public.blastapi.io     // 이더리움 노드
    //https://rpc.ankr.com/eth                   // 이더리움 노드 
    axios.get('https://api.polygonscan.com/api?module=contract&action=getabi&address=0x51ef526a26854aaba5e3123e401b0223d262dd1e&apikey=9IGGE1IKHYZKFV33QCXC68XY7QV665JUIS')
    .then(function (response) {
      // 성공한 경우 실행
      console.log("response : " + JSON.stringify(response));
    })
    .catch(function (error) {
      // 에러인 경우 실행
      console.log("error : " + error);
    })


    const myAddr = '0x0ae80159dd77ea78688ecb2a18f96f2d373b1228';

    const { ethers } = require("ethers");
    const NODE_URL = "https://polygon-rpc.com";    
    const provider = new ethers.providers.JsonRpcProvider(NODE_URL);
    //const contract = await ethers.getContractFactory("MyERC1155NFT");
    console.log("code : " +  JSON.stringify(contract));

    const code = await provider.getCode(myAddr,"latest" );    
    console.log("code : " +  JSON.stringify(code));

    var currentBlock = await provider.getBlockNumber();
    console.log("currentBlock : " + currentBlock);

    const txCount = await provider.getTransactionCount(myAddr, "latest" );
    console.log("Count : " + txCount);


    /*
    web3.eth.getBlockNumber().then((result) => {
      console.log("Latest Ethereum Block is ",result);
    });
    */


    /*
    const myWeb3 = require('web3');

    const provider = "https://polygon-rpc.com";
    const WebWeb = await new myWeb3(provider);
    */

    /*
    web3.eth.getBlockNumber().then((result) => {
      console.log("Latest Ethereum Block is ",result);
    });
    */
    
    /*
    var myAddr = '0x0ae80159dd77ea78688ecb2a18f96f2d373b1228';
    let block = await WebWeb.eth.getBlock('latest');
    let number = block.number;
    let transactions = block.transactions;

    console.log('Search Block: ' + block);
    console.log('number: ' + block.number);
    

    if (block != null && block.transactions != null) 
    {
        for (let txHash of block.transactions) 
        {
            const tx = await WebWeb.eth.getTransaction(txHash);
            const hash =  tx.to.toLowerCase();
            console.log(hash);
            if (myAddr == hash) 
            {
                console.log("from: " + tx.from.toLowerCase() + " to: " + tx.to.toLowerCase() + " value: " + tx.value);
            }
        }
    }
    */




    //const wallet = await web3.eth.getPendingTransactions();   //"eth_pendingTransactions "
    //ID : 07a655bf6c8a41658b05db11b38bd992
    //privateKey : dc4d764f90ad42bd89ba155a7f82e704
    //https://mainnet.infura.io/v3/07a655bf6c8a41658b05db11b38bd992

    //var myAddr = '0x0ae80159dd77ea78688ecb2a18f96f2d373b1228';
    //const count = await web3.eth.getBlockNumber();
    //console.log("Count : " + count );


    /*
    web3.eth.getPastLogs({fromBlock:'0x0',address:'0x9e3319636e2126e3c0bc9e3134AEC5e1508A46c7'})
    .then(res => {
          res.forEach(rec => {
          console.log(rec.blockNumber, rec.transactionHash, rec.topics);
    });
    }).catch(err => console.log("getPastLogs failed", err));
    */
    /*
    var myAddr = '0x0ae80159dd77ea78688ecb2a18f96f2d373b1228';
    var currentBlock = await web3.eth.blockNumber;
    console.log("currentBlock : " + currentBlock);

    var n = await web3.eth.getTransactionCount(myAddr, currentBlock);
    var bal = await web3.eth.getBalance(myAddr, currentBlock);
    for (var i=currentBlock; i >= 0 && (n > 0 || bal > 0); --i) {
        try {
            var block = await web3.eth.getBlock(i, true);
            if (block && block.transactions) {
                block.transactions.forEach(function(e) {
                    if (myAddr == e.from) {
                        if (e.from != e.to)
                            bal = bal.plus(e.value);
                        console.log(i, e.from, e.to, e.value.toString(10));
                        --n;
                    }
                    if (myAddr == e.to) {
                        if (e.from != e.to)
                            bal = bal.minus(e.value);
                        console.log(i, e.from, e.to, e.value.toString(10));
                    }
                });
            }
        } catch (e) { console.error("Error in block " + i, e); }
    }
    */
    

    const tokenContract = "";
    const erc1155Abi = require('../../components/erc1155Abi.json');
    tokenContract = await new web3.eth.Contract(erc1155Abi, "0x51ef526a26854aaba5e3123e401b0223d262dd1e");

    const owner = await tokenContract.methods.owner().call();
    const name = await tokenContract.methods.name().call();
    const symbol = await tokenContract.methods.symbol().call();

    /*
    let arr = [];
    for (let i = 1; i <= totalSupply; i++) {
      arr.push(i);
    }

    for (let tokenId of arr) {
      let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();
      if (String(tokenOwner).toLowerCase() === Address) {
        let tokenURI = await tokenContract.methods.uri(tokenId).call();
        console.log("TokenURI : " + tokenURI);

        setNftlist((prevState) => {
          return [...prevState, { name, symbol, tokenId, JsonURL, JsonName, JsonDescription, FireBaseDB }];
        });
  
        setShowlist((prevState) => {
          return [...prevState, { name, symbol, tokenId, JsonURL, JsonName, JsonDescription, FireBaseDB }];
        });        

      }
    }
    */

  }

  const SettingGameNFT = (isOK) => {
    setGameNFT(isOK);
    if (isOK == true)
      setShowlist(GameNFTlist);
    else
      setShowlist(nftlist);

  }


  const SaveMyToken = async () => {
    const tokenContract = "";

    console.log("account : " + Address);

    const CaverExtKAS = require('caver-js-ext-kas');
    const Caver = new CaverExtKAS();

    //해당 부분은 환경변수로 받아올수 있도록 수정
    const KasAccount = 'KASKY2SYRNZ8X68SL3QKRT4C';
    const KasKey = '8AMfKLWAzy8pSALU5Emo_iijrX7K6dqOPezqOH7x';
    const chainId = '8217';
    Caver.initKASAPI(chainId, KasAccount, KasKey);

    const query = {
      kind: [Caver.kas.tokenHistory.queryOptions.kind.NFT],
      size: 1000,
      //range: '1593529200,1599145200',
      //caFilter: '0xbbe63781168c9e67e7a8b112425aa84c479f39aa',
    }
    const result = await Caver.kas.tokenHistory.getTransferHistoryByAccount(Address, query);
    console.log("Send: " + JSON.stringify(result));

    /*
    query = { size: 5 };
    result = await Caver.kas.tokenHistory.getNFTOwnershipHistory("0x9faccd9f9661dddec3971c1ee146516127c34fc1", '0x3bb78636');
    //result = await Caver.kas.tokenHistory.getNFTList(newKip17addr, query);   
    console.log("Result : " + JSON.stringify(result));
    */

    let Contract = [];
    for (let i = 0; i <= query.size; i++) {
      const number = i;
      const jsondata = result['items'][number];

      //로그상에서 컨트랙트 ID 가지고 오기
      if (jsondata != 'undefined' && jsondata != null) {
        const jsonTo = jsondata['to'];
        const jsonTokenID = jsondata['tokenId'];

        if (jsonTo == Address) {
          const jsonContract = jsondata['contract']['address'];

          const Data = [jsonContract, jsonTokenID];
          Contract.push(Data);
        }
      }
      else {
        break;
      }
    }

    for (let con of Contract) {
      tokenContract = await new caver.klay.Contract(kip17Abi, con[0]);

      console.log("token : " + con);

      const name = await tokenContract.methods.name().call();
      const symbol = await tokenContract.methods.symbol().call();
      const tokenId = parseInt(con[1],16);

      const JsonURL = '';
      const JsonName = '';
      const JsonDescription = '';
      const FireBaseDB = false;

      let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();
      console.log("jsontokenOwner : " + tokenOwner);
      let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
      FireBaseDB = false;
      console.log("tokenURI : " + tokenURI);

      const URL = tokenURI.substring(0, 7);
      if (URL == "ipfs://") {
        const MetaDataJson = tokenURI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");

        const GetJson = await fetch(MetaDataJson);

        const jsonFile = await GetJson.json();
        console.log("jsonFile : " + JSON.stringify(jsonFile));

        JsonName = jsonFile.name;

        JsonDescription = jsonFile.description;
        const Image = jsonFile.image;
        //JsonURL = Image.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
        JsonURL = Image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
        console.log("JsonURL : " + JsonURL);

        //FireBaseNFTData(name, symbol, tokenId, JsonURL, JsonName, JsonDescription);
        const NFTItem = FireBaseInit.collection("NFT_ITEM");

        NFTItem.doc(JsonName).get().then((doc) => {
          if (doc.exists) {
            console.log("파이어베이스 이제 들어옴");

            FireBaseDB = true;
            setGameNFTlist((prevState) => {
              return [...prevState, { name, symbol, tokenId, JsonURL, JsonName, JsonDescription, FireBaseDB }];
            });
          }
        });
      }
      else {
        const GetJson = await fetch(tokenURI);
        const jsonFile = await GetJson.json();
        console.log("jsonFile : " + JSON.stringify(jsonFile));

        JsonName = jsonFile.name;      
        JsonDescription = jsonFile.description;
        JsonURL = jsonFile.image;
      }

      setNftlist((prevState) => {
        return [...prevState, { name, symbol, tokenId, JsonURL, JsonName, JsonDescription, FireBaseDB }];
      });

      setShowlist((prevState) => {
        return [...prevState, { name, symbol, tokenId, JsonURL, JsonName, JsonDescription, FireBaseDB }];
      });
    }

  };


  return (
    <div>
      <div>
        <button type="button" className="btn btn-outline-dark" onClick={() => { SettingGameNFT(false) }}>ALL NFT</button>
        <button type="button" className="btn btn-outline-dark" onClick={() => { SettingGameNFT(true) }}>Game NFT</button>
      </div>
      {Showlist.map((token) => {
        if (token != null)
        {
        return (
          <form className={Mystyles.todoNFTShowtemplate} key={token.id}>
            <div className="card mb-3">
              <h3 className="card-header">{token.FireBaseDB ? token.name + " GameNFT" : token.name}</h3>
              <div className="card-body" style={{ display: "block", margin: "auto", height: "250px", width: "250px" }}>
                <img
                  //style={{ width: "100%", height: "80%", objectFit: "cover", borderTopLeftRadius: "inherit", borderTopRightRadius: "inherit", margin: "0.1px" }}
                  style={{ width: "100%", height: "100%", objectFit: "contain", }}
                  src={token.JsonURL}
                  alt={token.id}
                />
              </div>
              <ul className="list-group list-group-flush">
                <table>
                  <li className="list-group-item"><tr><th scope="row" width="50px" text-align="center">이름</th>
                    <td>{token.JsonName}</td></tr></li>
                  <li className="list-group-item"><tr><th scope="row" width="50px" text-align="center">ID</th>
                    <td>{token.tokenId}</td></tr></li>
                  <li className="list-group-item"><tr><th scope="row" width="50px" text-align="center">심볼</th>
                    <td>{token.symbol}</td></tr></li>
                  <li className="list-group-item"><tr><th scope="row" width="50px" text-align="center">설명</th>
                    <td height="80px">{token.JsonDescription}</td></tr></li>
                </table>
 
                {/*
                <div><li className="list-group-item">ID : {token.tokenId} </li></div>
                <div><li className="list-group-item">심볼 : {token.symbol}</li></div>
                <div><li className="list-group-item">설명 : 안녕하세요 설명이 길어집니다{token.JsonDescription}</li></div>
                 */}
              </ul>
            </div>
          </form>
        );}
      })}
    </div>
  );
}

export default MyNFTData;