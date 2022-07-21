import React, { useState, useEffect } from 'react';
import kip17Abi from "../../components/kip17Abi";
import erc721Abi from "../../components/erc721Abi";
import erc1155Abi from "../../components/erc1155Abi";
import openseaAbi from "../../components/openseaErc1155";
import Mystyles from "../../styles/mynft.module.css";
import FireBaseInit from '../../components/FireBaseInit';
import Caver from "caver-js";
import axios from "axios";

const MyNFTData = ({ Address, walletType, web3, caver, newKip17addr,isLogin }) => {
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

  useEffect( async () => {
    if(!isLogin)
    {

    }

    if(walletType == "klay")
    {
      KlaytnNFT();  
    }
    else
    {
      const chainId = await web3.eth.getChainId();
      if(chainId == 137)  // polygon
        PolygonNFT();
      else if(chainId == 1) //eth 
        ethereumNFT();
    }
    

  }, []);

  const ethereumNFT = async () => 
  {
    const url = "https://deep-index.moralis.io/api/v2/" + Address + "/nft?chain=eth&format=decimal";
    axios.get(url,
    {
      headers: {
        "X-API-KEY": 'uDk5KWWhcDUrUxY5JfKsDp5vVu6ddDRzwS6skkDUgiYHHlQmxBX2MBbn0iKKK67J',
        "Content-Type": "application/json",
        "accept": "application/json"
      }
    })
    .then(async function (response) {
      const resultData = JSON.stringify(response['data']['result']);
      for (var i = 0; i < response.data.result.length; i++) 
      {        
        var user = response.data.result[i];

        const name = user.name;
        const symbol = user.symbol;
        const tokenId =  user.token_id;
        const tokenURI = user.token_uri;

        const JsonName = "";
        const JsonDescription = "";
        const JsonURL = "";
        const FireBaseDB = false;
        
        const URL = user.token_uri.substring(0, 7);
        if (URL == "ipfs://") 
        {          
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
        else
        {
          const GetJson = await fetch(tokenURI);
          const jsonFile = await GetJson.json();

          JsonName = jsonFile.name;      
          JsonDescription = jsonFile.description;
          if(!JsonDescription)
          {
            JsonDescription = jsonFile.bio;
          }

          JsonURL = jsonFile.image; 
          if(!JsonURL)
          {
            JsonURL = jsonFile.image_url;
          }
          
        }        

        setNftlist((prevState) => {
          return [...prevState, { name, symbol, tokenId, JsonURL, JsonName, JsonDescription, FireBaseDB }];
        });
  
        setShowlist((prevState) => {
          return [...prevState, { name, symbol, tokenId, JsonURL, JsonName, JsonDescription, FireBaseDB }];
        });        
      }
    })
    .catch(function (error) {
      // 에러인 경우 실행
      console.log("error : " + error);
    })
  }

  const PolygonNFT = async () => 
  {
    //https://polygon-mainnet.public.blastapi.io //폴리곤 노드
    //https://polygon-rpc.com                    //폴리곤 노드
    //https://eth-mainnet.public.blastapi.io     // 이더리움 노드
    //https://rpc.ankr.com/eth                   // 이더리움 노드 

    //오픈씨 컨트랙트 주소를 통해서 내가 배포한 NFT가 있는지 체크
   
    const openseaContract = "0x2953399124f0cbb46d2cbacd8a89cf0599974963";
    const tokenContract = await new web3.eth.Contract(openseaAbi, openseaContract);
    
    const acc = "0x0ae80159dd77ea78688ecb2a18f96f2d373b1228";
    const ID = "4933046329366196213817054263083356201750563802660559332468409021426879692801";
    

    const name = await tokenContract.methods.name().call();
    const symbol = await tokenContract.methods.symbol().call();    
    const Nonce = tokenContract.methods.getNonce(acc).call();
    const balanceOf = tokenContract.methods.balanceOf(acc,ID).call();

    const creator = tokenContract.methods.creator(ID).call();

    console.log("name : " + JSON.stringify(name));
    console.log("symbol : " + JSON.stringify(symbol));

    console.log("Nonce : " + JSON.stringify(Nonce));
    console.log("balanceOf : " + JSON.stringify(balanceOf));
    console.log("creator : " + JSON.stringify(creator));


    const MetaURL = "https://deep-index.moralis.io/api/v2/0x0ae80159dd77ea78688ecb2a18f96f2d373b1228/nft/0x2953399124f0cbb46d2cbacd8a89cf0599974963?chain=polygon&format=decimal";
    axios.get(MetaURL,
    {
      headers: {
        "X-API-KEY": 'uDk5KWWhcDUrUxY5JfKsDp5vVu6ddDRzwS6skkDUgiYHHlQmxBX2MBbn0iKKK67J',
        "Content-Type": "application/json",
        "accept": "application/json"
      }
    })
    .then(async function (response) {
      // 성공한 경우 실행
      console.log("MetaURL : " + JSON.stringify(response));
    })
    .catch(function (error) {
      // 에러인 경우 실행
      console.log("error : " + error);
    })



    //moralis API 에 있는 transction 로그를 이용해 NFT를 가지고 오는 방식
    const url = "https://deep-index.moralis.io/api/v2/" + Address + "/nft?chain=polygon&format=decimal";
    axios.get(url,
    {
      headers: {
        "X-API-KEY": 'uDk5KWWhcDUrUxY5JfKsDp5vVu6ddDRzwS6skkDUgiYHHlQmxBX2MBbn0iKKK67J',
        "Content-Type": "application/json",
        "accept": "application/json"
      }
    })
    .then(async function (response) {
      // 성공한 경우 실행
      
      const resultData = JSON.stringify(response['data']['result']);      
      for (var i = 0; i < response.data.result.length; i++) 
      {
        
        var user = response.data.result[i];
        //console.log(user);

        const name = user.name;
        const symbol = user.symbol;
        const tokenId =  user.token_id;
        const tokenURI = user.token_uri;

        const JsonName = "";
        const JsonDescription = "";
        const JsonURL = "";
        const FireBaseDB = false;

        
        const URL = user.token_uri.substring(0, 7);
        if (URL == "ipfs://") 
        {          
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
        else
        {
          const GetJson = await fetch(tokenURI);
          const jsonFile = await GetJson.json();

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
    })
    .catch(function (error) {
      // 에러인 경우 실행
      console.log("error : " + error);
    })

  }

  const SettingGameNFT = (isOK) => {
    setGameNFT(isOK);
    if (isOK == true)
      setShowlist(GameNFTlist);
    else
      setShowlist(nftlist);

  }


  const KlaytnNFT = async () => {
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
        JsonName = jsonFile.name;

        JsonDescription = jsonFile.description;
        const Image = jsonFile.image;
        //JsonURL = Image.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
        JsonURL = Image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
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
              <ul className="list-group list-group-flush" >
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
              </ul>
            </div>
          </form>
        );}
      })}
    </div>
  );
}

export default MyNFTData;