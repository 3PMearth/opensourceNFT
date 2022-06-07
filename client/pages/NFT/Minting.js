import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import MainTitle from "../MainTitle";
import Image from 'next/image';

import Mystyles from "../../styles/mynft.module.css";

import FireBaseInit from '../../components/FireBaseInit';
import pinataSDK from '@pinata/sdk';
//import DataFile from '../api/DataFile';
import FormData from 'form-data';
import Axios from 'axios';
import fs from 'fs'

import { create } from "ipfs-http-client";
import kip17Abi from "../../components/kip17Abi";

const PinataApiKey = "4f31d7dbb5810f6e37be";
const PinataSecretApiKey = "aa75590ac1823ed49f38e6c4b8be577d9dc5624640997f11a2a01223a7b0c608";

export default function CreateNFT({ web3, caver, newKip17addr }) {
  const [fileUrl, updateFileUrl] = useState('');
  const [isMint, setIsMint] = useState(false);
  const [Inputimage, setInputImage] = useState(null);
  const [Showimage, setShowImage] = useState(null);
  const [FileName, SetFileName] = useState(null);

  const [NFTName, setName] = useState('');
  const [NFTDescription, setDescription] = useState('');
  const [NFTUrl, setNFTUrl] = useState('');

  const [DataInput, setDataInput] = useState(false);
  const pinata = pinataSDK(PinataApiKey, PinataSecretApiKey);

  const MetaDataJson = {
    name: NFTName,
    image: Inputimage,
    description: NFTDescription,
    external_url: '',

  };

  const options = {
    pinataMetadata: {
      name: NFTName,
      keyvalues: {
        customKey: 'customValue',
        customKey2: 'customValue2'
      }
    },
    pinataOptions: {
      cidVersion: 0
    }
  };

  /*
  const fetchAPI = () => {
    setApiResult("Loading...");
    fetch("/api/image/")
      .then((r) => r.json())
      .then(setApiResult);
  };
  */

  const onChange = async (e) => {
    const file = e.target.files[0];
    const createURL = URL.createObjectURL(file);

    // get the hash
    setShowImage(createURL);
    SetFileName(file);
    

    /*
    console.log("file : " + JSON.stringify(file) + "  URL : " + createURL);
    const DataFile = require('../api/image/DataFile');        
    const readableStreamForFile = DataFile.CreateReadStreamData(createURL);

    
    setInputImage(createURL);
    console.log("ReadData :  " + readableStreamForFile);
    */
    /*
    //const readableStreamForFile = fs.createReadStream(createURL);
    console.log("Stream : " + readableStreamForFile);
    pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
      console.log("Result : " + result);
      const URL = "ipfs://" + result.data.IpfsHash;
      setInputImage(URL);

    }).catch((err) => {
      console.log(err);
    });
    */

    /*
    const client = create("https://ipfs.infura.io:5001/api/v0");
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      updateFileUrl(url);
      console.log("image : " + URL.createObjectURL(file));
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    */
  };


  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const createNewNFT = async () => {
    console.log("NFTUrl :  " + NFTUrl);

    let tokenContract;
    let newTokenId;

    const account = window.sessionStorage.getItem('ID');

    tokenContract = await new caver.klay.Contract(kip17Abi, newKip17addr, {
      from: account,
    });

    tokenContract.options.address = newKip17addr;
    newTokenId = await tokenContract.methods.mintNFT(account, NFTUrl).send(
      {
        from: account,
        gas: '850000'
      });

    const name = await tokenContract.methods.name().call();
    const symbol = await tokenContract.methods.symbol().call();
    const totalSupply = await tokenContract.methods.totalSupply().call();

    setIsMint(true);
    console.log("NFTUrl : " + NFTUrl);

  };

  const MakeJsonFile = async () => {

    const form = new FormData();
    form.append("file", FileName);
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    const response = await Axios.post(
      url,
      form,
      {
        maxContentLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data;boundary=${form._boundary}`,
          'pinata_api_key': PinataApiKey,
          'pinata_secret_api_key': PinataSecretApiKey

        }
      }
    )
    console.log("respone : " + response.data.IpfsHash);
    setInputImage(response.data.IpfsHash);
    console.log("Inputimage : " + Inputimage);

    MetaDataJson.image = "ipfs://" + response.data.IpfsHash;

    //json 파일을 피네타사이트에 넣기
    pinata.pinJSONToIPFS(MetaDataJson, options).then((result) => {
      //handle results here
      console.log(result);
      //setNFTUrl("ipfs://" +  result.data.IpfsHash);
      setNFTUrl("ipfs://" + result.IpfsHash);
      setDataInput(true);

      let tokenContract;
      let newTokenId;
  
      const account = window.sessionStorage.getItem('ID');
  
      tokenContract = new caver.klay.Contract(kip17Abi, newKip17addr, {
        from: account,
      });
  
      tokenContract.options.address = newKip17addr;
      newTokenId = tokenContract.methods.mintNFT(account, "ipfs://" + result.IpfsHash).send(
        {
          from: account,
          gas: '850000'
        });

    }).catch((err) => {
      //handle error here
      console.log(err);
      setDataInput(false);
    });
  }

  return (
    <div>
      <MainTitle />
      <form className={Mystyles.todolisttemplate}>
        <fieldset>
          <legend>NFT 제 작</legend>

          <div className="form-group">
            {/*<label for="formFile" class="form-label mt-4">Default file input example</label> */}
            <input className="form-control" type="file" id="formFile" onChange={onChange} />
            <img htmlFor="fileInput" src={Showimage} className={Mystyles.selectedImage} />
          </div>
          <br></br>
          <div className="form-group row">
            <label htmlFor="exampleInputEmail1" className="col-sm-2 col-form-label">이  름</label>
            <div className="col-sm-10">
              <input type="name" className="form-control" id="NFT_Name" onChange={onNameChange} placeholder="name" />
              {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="exampleTextarea" className="form-label mt-4">설  명</label>
            <textarea className="form-control" id="exampleTextarea" onChange={onDescriptionChange} rows="3"></textarea>
          </div>
        </fieldset>

        <br></br>
        <Button size="big" content="Create Data" onClick={MakeJsonFile}>Minting</Button>
      </form>
    </div>


  );

}

//{ DataInput ? <Button size="big" content="Create NFT" onClick={createNewNFT}>Minting</Button>  :  setDataInput(false)}
/*
<div className={styles.selectFile}>
<label htmlFor="fileInput">
<img htmlFor="fileInput" src={image} alt="preview image" className={styles.selectedImage} />
</label>
<input type="file" name="file" onChange={onChange} id="fileInput" />
</div>
<div>{fileUrl ? <div>IPFS Link: {fileUrl}</div> : ""}</div>



<Button size="big" content="Create NFT" onClick={createNewNFT}>Minting</Button>



          <div class="form-group row">
            <label for="exampleInputPassword1" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
          </div>
*/
//NFT 생성하는 코드
/*
createNewNFT는 화면에서 이미지를 올린 후 createNFT 버튼을 클릭했을 때 실행되는 함수로,
앞서 지갑연결과 같이 walletType에 따라 이더리움이나 클레이튼 컨트랙트로 접근하여 mintNFT 함수를 실행시킨다. 파라메터로 연결된 지갑 주소와 업로드한 파일의 IPFS 주소 값을 넘겨준다.
이렇게 하면 나만의 NFT 생성 완료..!
*/