import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";

import Mystyles from "../../styles/mynft.module.css";

import pinataSDK from '@pinata/sdk';
//import DataFile from '../api/DataFile';
import FormData from 'form-data';
import Axios from 'axios';

import kip17Abi from "../../components/kip17Abi";

const PinataApiKey = "4f31d7dbb5810f6e37be";
const PinataSecretApiKey = "aa75590ac1823ed49f38e6c4b8be577d9dc5624640997f11a2a01223a7b0c608";

export default function CreateNFT({Address, walletType,isLogin, web3, caver, newKip17addr }) {
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


  const onChange = async (e) => {
    const file = e.target.files[0];
    const createURL = URL.createObjectURL(file);

    // get the hash
    setShowImage(createURL);
    SetFileName(file);
    
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

    tokenContract = await new caver.klay.Contract(kip17Abi, newKip17addr, {
      from: Address,
    });

    tokenContract.options.address = newKip17addr;
    newTokenId = await tokenContract.methods.mintNFT(Address, NFTUrl).send(
      {
        from: Address,
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
    console.log("newKip17addr : " + newKip17addr );

    MetaDataJson.image = "ipfs://" + response.data.IpfsHash;

    //json ????????? ????????????????????? ??????
    pinata.pinJSONToIPFS(MetaDataJson, options).then((result) => {
      //handle results here
      console.log(result);
      //setNFTUrl("ipfs://" +  result.data.IpfsHash);
      setNFTUrl("ipfs://" + result.IpfsHash);
      setDataInput(true);

      let tokenContract;
      let newTokenId;
  
      tokenContract = new caver.klay.Contract(kip17Abi, newKip17addr, {
        from: Address,
      });
  
      tokenContract.options.address = newKip17addr;

    }).catch((err) => {
      //handle error here
      console.log(err);
      setDataInput(false);
    });
  }

  return (
    <div>
      <form className={Mystyles.todolisttemplate}>
        <fieldset>
          <legend>NFT ??? ???</legend>

          <div className="form-group">
            {/*<label for="formFile" class="form-label mt-4">Default file input example</label> */}
            <input className="form-control" type="file" id="formFile" onChange={onChange} />
            <img htmlFor="fileInput" src={Showimage} className={Mystyles.selectedImage} />
          </div>
          <br></br>
          <div className="form-group row">
            <label htmlFor="exampleInputEmail1" className="col-sm-2 col-form-label">???  ???</label>
            <div className="col-sm-10">
              <input type="name" className="form-control" id="NFT_Name" onChange={onNameChange} placeholder="name" />
              {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="exampleTextarea" className="form-label mt-4">???  ???</label>
            <textarea className="form-control" id="exampleTextarea" onChange={onDescriptionChange} rows="3"></textarea>
          </div>
        </fieldset>

        <br></br>
        <Button size="big" content="Create Data" onClick={MakeJsonFile}>Minting</Button>
      </form>
    </div>


  );

}
