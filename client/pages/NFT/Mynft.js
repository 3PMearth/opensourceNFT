import React, { useState, useEffect } from 'react';
import MainTitle from "../MainTitle";
import kip17Abi from "../../components/kip17Abi";
//import Mystyles from "../../styles/mynft.module.css";
//import FireBaseInit from '../../components/FireBaseInit';

const Mynft = ({ caver, newKip17addr }) => {
  return (
    <div>
      <MainTitle />
    </div>

  )
}

export default Mynft;

/*
export default function Mynft({ caver, newKip17addr }) {

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
    
  }, []);
  
  const SettingGameNFT = (isOK) =>
  {
    setGameNFT(isOK);
    if(isOK == true)
      setShowlist(GameNFTlist);
    else
      setShowlist(nftlist);
      
  }

  const SaveMyToken = async () =>{
    const tokenContract = "";
    const account = window.sessionStorage.getItem('ID');

    console.log("NFT : " + newKip17addr);
    console.log("account : " + account);

    tokenContract = await new caver.klay.Contract(kip17Abi, newKip17addr);

    const name = await tokenContract.methods.name().call();
    const symbol = await tokenContract.methods.symbol().call();
    const totalSupply = await tokenContract.methods.totalSupply().call();

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
      if (String(tokenOwner).toLowerCase() === account) 
      {
        let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
        FireBaseDB = false;

        if (tokenURI != '') 
        {
          const MetaDataJson = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
          const GetJson = await fetch(MetaDataJson);

          const jsonFile = await GetJson.json();
          console.log("jsonFile : " + JSON.stringify(jsonFile));

          JsonName = jsonFile.name;

          JsonDescription = jsonFile.description;
          const Image = jsonFile.image;
          JsonURL = Image.replace("ipfs://", "https://ipfs.io/ipfs/");
          console.log("JsonURL : " + JsonURL);

          //FireBaseNFTData(name, symbol, tokenId, JsonURL, JsonName, JsonDescription);
          const NFTItem = FireBaseInit.collection("NFT_ITEM");

          NFTItem.doc(JsonName).get().then((doc) => {
            if(doc.exists)
            { 
              console.log("파이어베이스 이제 들어옴");

              FireBaseDB = true;
              setGameNFTlist((prevState) => {
                return [...prevState, {name, symbol, tokenId, JsonURL, JsonName, JsonDescription, FireBaseDB }];
              });        
            }
          });
        }

        setNftlist((prevState) => {
          return [...prevState, {name, symbol, tokenId, JsonURL, JsonName, JsonDescription, FireBaseDB }];
        });

        setShowlist((prevState) => {
          return [...prevState, {name, symbol, tokenId, JsonURL, JsonName, JsonDescription, FireBaseDB }];
        });
      }
    }

  };
 

  return (
    <div>
      <MainTitle />
      <div>
      <button type="button" className="btn btn-outline-dark" onClick = {() => {SettingGameNFT(false)}}>ALL NFT</button>
      <button type="button" className="btn btn-outline-dark" onClick = {() => {SettingGameNFT(true)}}>Game NFT</button>
      </div>
      {Showlist.map((token) => {
        return (
          <form className={Mystyles.todoNFTShowtemplate} key={token.id}> 
            <div className="card mb-3">
              <h3 className="card-header">{ token.FireBaseDB ? token.name + " GameNFT" : token.name}</h3>
              <div className="card-body">
                <img
                  src={token.JsonURL}
                  alt={token.id}
                  style={{ width: "100%", height: "80%", objectFit: "cover", borderTopLeftRadius: "inherit", borderTopRightRadius: "inherit", margin: "0.1px" }}
                />
              </div>

              <ul className="list-group list-group-flush">
                <li className="list-group-item">이름 : {token.JsonName} </li>
                <li className="list-group-item">심볼 : {token.symbol}</li>
                <li className="list-group-item">설명 : {token.JsonDescription}</li>
              </ul>
            </div>
          </form>
        );
      })}
    </div>
  );

}
 */
/*
import React, { useState, useEffect } from 'react';
import MainTitle from "../MainTitle";
import kip17Abi from "../../components/kip17Abi";
import Mystyles from "../../styles/mynft.module.css";
import FireBaseInit from '../../components/FireBaseInit';

const Mynft = ({ caver, newKip17addr }) => {
  const [nftlist, setNftlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGameNFT, setGameNFT] = useState(false);

  //Firebase Database 
  const [Info, setInfos] = useState({
    Contract: '',
    GameItemValue: -1,
    Token: -1
  });


  useEffect(async () => {
    SaveMyToken()
    
  }, []);

  const FireBaseNFTData = (name) => {

    if(name == '')
      return;
      
    const NFTItem = FireBaseInit.collection("NFT_ITEM");

    NFTItem.doc(name).get().then((doc) => {
      if(doc.exists)
      { 
        // document의 데이터를 가져옴
        console.log(doc.data());
        console.log("파이어베이스 이제 들어옴");

        const findIndex = nftlist.findIndex(element => element.JsonName == name);

        console.log("1. Count : " + nftlist.length  + "  findIndex : " + findIndex + "  Name : " + name);
        nftlist[findIndex].FireBaseDB = true;
        setNftlist(nftlist);
      }
    });
  }

  const SettingGameNFT = (isOK) =>
  {
    setGameNFT(isOK);
  }

  const SaveMyToken = async () => {
    const tokenContract = "";
    const account = window.sessionStorage.getItem('ID');

    console.log("NFT : " + newKip17addr);
    console.log("account : " + account);

    tokenContract = await new caver.klay.Contract(kip17Abi, newKip17addr);

    const name = await tokenContract.methods.name().call();
    const symbol = await tokenContract.methods.symbol().call();
    const totalSupply = await tokenContract.methods.totalSupply().call();
    const URL = await tokenContract.tokenURI;

    const Index = 0;
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
        Index = tokenId;

        if (tokenURI != '') {
          const MetaDataJson = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
          const GetJson = await fetch(MetaDataJson);

          const jsonFile = await GetJson.json();
          console.log("jsonFile : " + JSON.stringify(jsonFile));

          JsonName = jsonFile.name;

          JsonDescription = jsonFile.description;
          const Image = jsonFile.image;
          JsonURL = Image.replace("ipfs://", "https://ipfs.io/ipfs/");
          console.log("JsonURL : " + JsonURL);
          
          FireBaseDB = false;  

        }

        setNftlist((prevState) => {
          return [...prevState, {name, symbol, tokenId, JsonURL, JsonName, JsonDescription, FireBaseDB }];
        });
        FireBaseNFTData(JsonName.toString());

        console.log("--- tokenURI : " + tokenURI + "   Count : " + nftlist.length + "   ---");
      }
    }

    setIsLoading(false);
  };

  

  return (
    <div>
      <MainTitle />

      <div className={Mystyles.button}> 
      <button type="button" class="btn btn-outline-dark" onClick = {() => {SettingGameNFT(false)}} >Main</button>
      <button type="button" class="btn btn-outline-dark" onClick = {() => {SettingGameNFT(true)}} >GameNFT</button>
      </div>
      {nftlist.map((token) => {
        return (
          <form className={Mystyles.todoNFTShowtemplate}> 
            <div className="card mb-3">
              <h3 className="card-header">{ token.FireBaseDB ? token.name + " GameNFT" : token.name}</h3>
              <div className="card-body">
                <img
                  src={token.JsonURL}
                  alt={token.id}
                  style={{ width: "100%", height: "80%", objectFit: "cover", borderTopLeftRadius: "inherit", borderTopRightRadius: "inherit", margin: "0.1px" }}
                />
              </div>

              <ul className="list-group list-group-flush">
                <li className="list-group-item">이름 : {token.JsonName} </li>
                <li className="list-group-item">심볼 : {token.symbol}</li>
                <li className="list-group-item">설명 : {token.JsonDescription}</li>
              </ul>
            </div>
          </form>
        );
      })}
    </div>
  );

}

export default Mynft;
*/
/*

      {nftlist.map((token) => {
        return (
          <div key={token.tokenId} className={styles.tokenContainer}>
            <img
              src={token.JsonURL}
              alt={token.id}
              style={{ width: "100%", height: "80%", objectFit: "cover", borderTopLeftRadius: "inherit", borderTopRightRadius: "inherit", margin: "0.1px" }}
            />
            <div className={styles.desc}>
              <div className={styles.user}>
                <div className={styles.userText}>
                  <span>{token.name}</span>
                  <div>{token.symbol}</div>
                </div>
              </div>
              <div style={{ marginRight: "20px" }}>
                <p>{token.owner}</p>
              </div>
            </div>
          </div>
        );
      })}
*/

/*
const FireBaseNFTData = (name) => {
  if(name == '')
    return;
    
  const NFTItem = FireBaseInit.collection("NFT_ITEM");

  NFTItem.doc(name).get().then((doc) => {
    if(doc.exists)
    { 
      // document의 데이터를 가져옴
      console.log(doc.data());
      console.log("파이어베이스 이제 들어옴");

      const findIndex = nftlist.findIndex(element => element.JsonName == name);

      console.log("1. Count : " + nftlist.length  + "  findIndex : " + findIndex + "  Name : " + name);
      nftlist[findIndex].FireBaseDB = true;
      setNftlist(nftlist);
    }
  });

  ////////////////////////////////////////////////////////////////////////
  const NFTItem = FireBaseInit.ref("/NFT/Item/" + name);
  console.log("파이어베이스 이름 : " + name + "   Item : " + NFTItem);
  if (NFTItem == null) {
    //해당 NFT가 없으면
    setIsFireBase(false);
    return false;
  }
  else {
    NFTItem.once("value", (snapshot) => {
      console.log("파이어베이스 이제 들어옴");
      if (snapshot.exists()) 
      {          
        const state = snapshot.val();
        
        //setInfos(state);
        //console.log("state " + JSON.stringify(state));
        //console.log("Info " + JSON.stringify(Info));
        setIsFireBase(true);
        //어드레스 비교
        return true;
        
      }
      else {
        setIsFireBase(false);
        return false;
      }
    });
  }
}
*/