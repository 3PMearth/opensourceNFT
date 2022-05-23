import React, { useState, useEffect } from 'react';
import MainTitle from "../MainTitle";
import kip17Abi from "../../components/kip17Abi";
import Mystyles from "../../styles/mynft.module.css";
import FireBaseInit from '../../components/FireBaseInit';
import Caver from "caver-js";

const MyNFTData = ({ caver, newKip17addr }) => {
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
    KasMigrate();
    /*
    TokenHistoryQueryOptions options = new TokenHistoryQueryOptions();
    options.setStatus("completed");
    options.setSize((long)1);
    options.setType("KIP-7");

    PageableFtContractDetails details = caver.kas.tokenHistory.getFTContractList(options);
    System.out.println(details);
    */



  }, []);

  /*
  void getContractList() {
    try {
        Kip17ContractListResponse response = caver.kas.kip17.getContractList();
    } catch(ApiException e) {
        //handle error
    }
  }
  */

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
    const privateKey = "0x75d0ed32d4d58d5e3299b56d38bacc782c052a831bd8c15f6e0702ad5fe52723";

    const rpc = await caver.rpc.klay.getAccount(account);
    //const rpc = await caver.rpc.klay.sign(account, "hello");
    //const rpc = await caver.rpc.klay.getTransactionCount(account);
    const result = await Caver.kas.tokenHistory.getNFTContract('0x85106722f1895bdE84398076902975F914ef6717');

    console.log("RPC: " + JSON.stringify(rpc));
    console.log("result: " + JSON.stringify(result));

    const query = {
      status: Caver.kas.tokenHistory.queryOptions.status.COMPLETED,
      size: 100,
      type: Caver.kas.tokenHistory.queryOptions.type.KIP17,
    };

    result = await Caver.kas.tokenHistory.getNFTContractList(query);
    console.log("result22: " + JSON.stringify(result));

    



    // Klaytn 계정을 KAS Wallet API로 마이그레이션하기 위해서는 트랜잭션을 생성하고 이를 서명하여 KAS로 전송해야 합니다.
    // 트랜잭션에 서명하기 위해 Klaytn 계정으로 Keyring 인스턴스를 생성하고 이를 KeyringContainer에 추가합니다.
    // 만약 Klaytn 계정의 키가 `AccountKeyWeigthedMultiSig`이거나 `AccountKeyRoleBased`인 경우
    // `keyringContainer.keyring.create` 의 두 번째 파라미터를 배열 혹은 이중 배열로 넘기면 됩니다.
    // 더욱 자세한 내용은 https://docs.klaytn.com/dapp/sdk/caver-js/api-references/caver.wallet/keyring#caver-wallet-keyring-create 를 참고해 주세요.
    /*
    const keyringContainer =  new Caver.keyringContainer();
    const keyring = keyringContainer.keyring.create(account,privateKey);
    keyringContainer.add(keyring);

    const createdKeys = await Caver.kas.wallet.createKeys(1);
    const key = createdKeys.items[0];

    // FeeDelegatedAccountUpdate 트랜잭션을 생성합니다.
    // account 필드에 할당되는 값은 `caver.account.createWithAccountKeyPublic`를 사용하여 생성할 수 있으며
    // 마이그레이션 하고자 하는 계정의 주소, 그리고 KAS Wallet API에 생성된 키(public key string 형태)를 파라미터로 전달해야 합니다.
    const updateTx = new Caver.transaction.feeDelegatedAccountUpdate({
        from: keyring.address,
        account: Caver.account.createWithAccountKeyPublic(keyring.address, key.publicKey),
        gas: 1000000,
    });

    // 트랜잭션에 서명합니다.
   
    await keyringContainer.sign(keyring.address, updateTx);

    const result = {
        keyId: key.keyId,
        address: keyring.address,
        rlp: updateTx.getRLPEncoding(),
    };

    console.log("Result : " + result);
    */

    /*
    
    const caverExt = new CaverExtKAS();

    const account = 'KASKY2SYRNZ8X68SL3QKRT4C';
    const privateKey = '8AMfKLWAzy8pSALU5Emo_iijrX7K6dqOPezqOH7x';
    const chainId = '1001';
    caverExt.initKASAPI(chainId, account, privateKey);
    console.log("Init KIP17 API");

    const contracts = await caverExt.kas.kip17.getContractList();
    console.log("GetContractList : " + JSON.stringify(contracts));

    const query = {
      status: caverExt.kas.tokenHistory.queryOptions.status.COMPLETED,
      size: 100,
      type: caverExt.kas.tokenHistory.queryOptions.type.KIP17,
  }
    const result = await caverExt.kas.tokenHistory.getNFTContractList(query); 
    console.log("getNFTContractList : " + JSON.stringify(result));
    */

    /* 
    // Create a KeyringContainer instance
    const keyringContainer = new caverExt.keyringContainer();

    // Create a keyring from private key

    const keyring = keyringContainer.keyring.createFromPrivateKey(privateKey);

    // Add a keyring to the keyringContainer
    keyringContainer.add(keyring);
    */


    //const address = keyring.address;
    //const key = keyring.key.privateKey;
    //const nonce = 0;

    //const ret = await caver.kas.wallet.migrateAccounts([{ address, key, nonce }]);
    //console.log(ret); 
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

    console.log("NFT : " + newKip17addr);
    console.log("account : " + account);

    tokenContract = await new caver.klay.Contract(kip17Abi, newKip17addr);

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
      //let blocknumber = await caver.rpc.klay.getBlockByNumber(tokenId);
      //let blockhash = await caver.rpc.klay.getFilterLogs(account);
      //console.log("blockhash : " + JSON.stringify(blockhash));

      //transaction.getTransactionHash()
      //transaction.getSenderTxHash()

      if (String(tokenOwner).toLowerCase() === account) {
        let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
        FireBaseDB = false;
        console.log("tokenURI : " + tokenURI);

        //Nft nft = caver.kas.tokenHistory.getNFT(contractAddress, tokenId);
        //System.out.println(nft);

        const URL = tokenURI.substring(0, 7);
        if (URL == "ipfs://") {
          const MetaDataJson = tokenURI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");

          //const config = { headers : { 'Accept' : 'application/json'}};
          //const GetJson = await fetch(MetaDataJson,config);
          const GetJson = await fetch(MetaDataJson);

          const jsonFile = await GetJson.json();
          console.log("jsonFile : " + JSON.stringify(jsonFile));

          JsonName = jsonFile.name;

          JsonDescription = jsonFile.description;
          const Image = jsonFile.image;
          JsonURL = Image.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
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
              <div className="card-body">
                <img
                  src={token.JsonURL}
                  alt={token.id}
                  style={{ width: "100%", height: "80%", objectFit: "cover", borderTopLeftRadius: "inherit", borderTopRightRadius: "inherit", margin: "0.1px" }}
                />
              </div>

              <ul className="list-group list-group-flush">
                <li className="list-group-item">이름 : {token.JsonName} </li>
                <li className="list-group-item">ID : {token.tokenId} </li>
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

export default MyNFTData;