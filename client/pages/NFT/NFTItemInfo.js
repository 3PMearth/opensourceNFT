import React, { useState } from 'react';
import MainTitle from "../MainTitle";
import FireBaseInit from '../../components/FireBaseInit';
import pinataSDK from '@pinata/sdk';

const NFTItemInfo = () => {
    const [Info, setInfos] = useState({
        Contrarct: '',
        GameItemValue: -1,
        Token: -1
    });

    const body = {
            message: 'Pinatas are awesome'
        };


    const FireBaseNFTData = (name) => {
        /*
        데이터 저장: set() 메서드에 저장할 데이터를 인자로 전달해 호출
        데이터 삭제: remove() 메서드 호출
        데이터 읽기 & 변경사항 수신: ref에 on() 또는 once() 메서드를 사용하여 이벤트(value)를 관찰  
        */
        const NFTItem = FireBaseInit.ref("/NFT/Item/" + name);
        NFTItem.on("value", snapshot => {
            const state = snapshot.val();
            setInfos(state);
            console.log("state " + JSON.stringify(state));
            console.log("Info " + JSON.stringify(Info));
        });
    }

    return (
        <div>
            <MainTitle />
            <button onClick={() => FireBaseNFTData("Test1")}> Test1 </button>
            <button onClick={() => MakeJsonFile()}> Json File </button>
        </div>
    );
}
export default NFTItemInfo;
