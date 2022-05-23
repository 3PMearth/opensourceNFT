import React, { useState } from 'react';
//import fs from 'fs'
import * as fs from 'fs'
import pinataSDK from '@pinata/sdk';
import https from "https";


const PinataApiKey = "5f18d53d45731d696c5c";
const PinataSecretApiKey = "c9a7120e9fdf70a226e1e1c7415dce35dc8fd2da007c06b5593007042c729e00";
  /*
export default function handler(req, res) {
  try {
    const pinata = pinataSDK(
      PinataApiKey,
      PinataSecretApiKey
    );
    pinata
      .testAuthentication()
      .then((result) => {
        https.get("https://i.picsum.photos/id/324/200/300.jpg", (resp) =>
          resp.pipe(fs.createWriteStream(`./picture.jpg`))
        );
        pinata
          .pinFromFS("./picture.jpg")
          .then((result) => {
            res.status(200).json({ success: true, msg: result });
          })
          .catch((err) => {
            res.status(500).json({ success: false, msg: err.msg });
          });
      })
      .catch((err) => {
        res.status(500).json({ success: false, msg: err.msg });
      });
  } catch (e) {
    res.status(500).json({ success: false, msg: e });
  }
}
*/

export function CreateReadStreamData(Data) {

    console.log("Data : " + Data);

    return fs.readFile(Data);

    //return fs.createReadStream(Data);

    /*
    const pinata = pinataSDK(PinataApiKey, PinataSecretApiKey);

    //const { Readable } = require('stream');
    //const stream = Readable.from(Data);    
    pinata.pinFileToIPFS(fs.createReadStream(Data), options).then((result) => {
        console.log("Result : " + result);
        const URL = "ipfs://" + result.data.IpfsHash;

    }).catch((err) => {
        console.log(err);
    });
    */

    //serverside work
    //if (typeof window === "undefined") {
    //const Read = fs.createReadStream(Data);
    //console.log("Read : " + Read);
    //return { props: { Read } }
    //return Read;
    //}

    //console.log("CreateReadStreamData null");
}