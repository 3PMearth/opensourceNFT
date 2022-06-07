import React, { useState, useEffect } from 'react';
import MainTitle from "../MainTitle";
import kip17Abi from "../../components/kip17Abi";
import Mystyles from "../../styles/mynft.module.css";
import FireBaseInit from '../../components/FireBaseInit';
import Caver from "caver-js";

const MyNFTData = ({ web3, caver, newKip17addr }) => {
  const [nftlist, setNftlist] = useState([]);
  
  const [Contractlist, setContractlist] = useState([]);
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

  }, []);

  const KasMigrate = async () => {
    // 키 마이그레이션
    const CaverExtKAS = require('caver-js-ext-kas');
    const newCaver = require('caver-js');
    //const Caver = new newCaver('https://api.baobab.klaytn.net:8651/');
    const Caver = new CaverExtKAS();
    
    const KasAccount = 'KASKY2SYRNZ8X68SL3QKRT4C';
    const KasKey = '8AMfKLWAzy8pSALU5Emo_iijrX7K6dqOPezqOH7x';
    const chainId = '1001';
    Caver.initKASAPI(chainId, KasAccount, KasKey);


    const account = window.sessionStorage.getItem('ID');
    console.log("result: " + JSON.stringify(result));

    //완성본
    const query = {
      kind: [Caver.kas.tokenHistory.queryOptions.kind.NFT],
      size: 5,
      //range: '1593529200,1599145200',
      //caFilter: '0xbbe63781168c9e67e7a8b112425aa84c479f39aa',
    }
    const result = await Caver.kas.tokenHistory.getTransferHistoryByAccount(account, query);
    //console.log("Send: " + JSON.stringify(result));

    let index = 0;
    const jsondata = result['items'][index]['to'];
    console.log("JSON : " + JSON.stringify(jsondata));
    
    let arr = [];
    for (let i = 0; i <= query.size; i++) {
      console.log("i : " + i + "    JSON : " + JSON.stringify(result['items']['0']['to']) + "   Address : " + account);

      const number = i;
      const jsondata = result['items'][number];

       if(jsondata != 'undefined' && jsondata != null)
       {
          const jsonTo =  jsondata['to'];

          if(jsonTo == account)
          {
            const jsonContract =  jsondata['contract']['address'];
            setContractlist((prevContract) => {
              return [...prevContract, { jsonContract }];
            });
          }
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
    const account = window.sessionStorage.getItem('ID');

    console.log("account : " + account);

    const CaverExtKAS = require('caver-js-ext-kas');
    const Caver = new CaverExtKAS();    

    //해당 부분은 환경변수로 받아올수 있도록 수정
    const KasAccount = 'KASKY2SYRNZ8X68SL3QKRT4C';
    const KasKey = '8AMfKLWAzy8pSALU5Emo_iijrX7K6dqOPezqOH7x';
    const chainId = '1001';
    Caver.initKASAPI(chainId, KasAccount, KasKey);

    const query = {
      kind: [Caver.kas.tokenHistory.queryOptions.kind.NFT],
      size: 1000,
      //range: '1593529200,1599145200',
      //caFilter: '0xbbe63781168c9e67e7a8b112425aa84c479f39aa',
    }
    const result = await Caver.kas.tokenHistory.getTransferHistoryByAccount(account, query);
    //console.log("Send: " + JSON.stringify(result));

    let index = 0;
    const jsondata = result['items'][index]['to'];
    console.log("JSON : " + JSON.stringify(jsondata));
    
    let Contract = [];
    for (let i = 0; i <= query.size; i++) 
    {
      const number = i;
      const jsondata = result['items'][number];

      //로그상에서 컨트랙트 ID 가지고 오기
       if(jsondata != 'undefined' && jsondata != null)
       {
          const jsonTo =  jsondata['to'];

          if(jsonTo == account)
          {
            const jsonContract =  jsondata['contract']['address'];
            Contract.push(jsonContract);
          }
       }
       else
       {
         break;
       }
    }    

    let uniqueArr = [];
    Contract.forEach((element) => {
    if (!uniqueArr.includes(element)) {
        uniqueArr.push(element);
    }
    });
    

    for (let con of uniqueArr) 
    {
      tokenContract = await new caver.klay.Contract(kip17Abi, con);

      const name = await tokenContract.methods.name().call();
      const symbol = await tokenContract.methods.symbol().call();
      const totalSupply = await tokenContract.methods.totalSupply().call();
  
      const option = tokenContract.options;
  
      const JsonURL = '';
      const JsonName = '';
      const JsonDescription = '';
      const FireBaseDB = false;
  
      let arr = [];
      for (let i = 1; i <= totalSupply; i++) {
        arr.push(i);
      }
  
      for (let tokenId of arr) {
        let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();
  
        if (String(tokenOwner).toLowerCase() === account) {
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
            JsonName = tokenURI;
          }
  
          setNftlist((prevState) => {
            return [...prevState, { name, symbol, tokenId, JsonURL, JsonName, JsonDescription, FireBaseDB }];
          });
  
          setShowlist((prevState) => {
            return [...prevState, { name, symbol, tokenId, JsonURL, JsonName, JsonDescription, FireBaseDB }];
          });
        }
      }      
    }
  };


  return (
    <div>
      <MainTitle />
      <div>
        <button type="button" className="btn btn-outline-dark" onClick={() => { SettingGameNFT(false) }}>ALL NFT</button>
        <button type="button" className="btn btn-outline-dark" onClick={() => { SettingGameNFT(true) }}>Game NFT</button>
      </div>
      {Showlist.map((token) => {
        return (
          <form className={Mystyles.todoNFTShowtemplate} key={token.id}>
            <div className="card mb-3">
              <h3 className="card-header">{token.FireBaseDB ? token.name + " GameNFT" : token.name}</h3>
              <div className="card-body" style={{ display: "block", margin: "auto", height: "250px" ,width: "250px"  }}>
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
        );
      })}
    </div>
  );
}

export default MyNFTData;