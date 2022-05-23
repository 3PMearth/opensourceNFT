import React, { useState } from 'react';
//import {Modal} from './Modal';
import LoginModal from './LoginModal';
//import AlretText from './AlretText';

const Login = () => {
    /*
    const [Address, SetAddress] = useState('Login');
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };
    const closeModal = () => {
      setModalOpen(false);
    };    

    const CheckUnlocked = async () => 
    {
        if (typeof window !== 'undefined' && window.klaytn) 
        {
            const isID = window.sessionStorage.getItem('ID');
            // 지갑이 연결되어있다면 true, 아니라면 false를 리턴합니다.
            const isUnlock = await window.klaytn._kaikas.isUnlocked();
    
            if (isID !== null && isUnlock === true) 
            {
                SetAddress(isID);
            }
        }

    }

    CheckUnlocked();

    const kaikasLogin = async () => {
        console.log("On Login Function");
        const wallet = await window.klaytn.enable();
        const version = await window.klaytn.networkVersion;
        const selectedId = await window.klaytn.selectedAddress;
        if (selectedId !== 'undefined') {
            console.log("Version :" + version);
            console.log("ID : " + selectedId);
            SetAddress(selectedId);
            //쿠키 세션에 Id값 저장 
            //추후에, ID에 맞는 닉네임 보여지게끔
            window.sessionStorage.setItem('ID', selectedId);
        }
    }

    //설치되어있는 실제 카이카스 지갑이 로그인이 되어있는지를 확인
    const onClickKaikas = () => {
        if (window.klaytn) {
            if (window.klaytn.isKaikas) {
                //로그인/회원가입 진행                
                const LoginID = window.sessionStorage.getItem('ID');
                if (LoginID !== null) 
                {
                    //로그아웃
                    console.log("kaikas Out");
                    window.sessionStorage.removeItem('ID');
                    SetAddress('Login');
                }
                else 
                {
                    console.log("kaikas Login!");
                    kaikasLogin();
                }
            }
        }
        else {
            alert("kaikas를 다운받아주세요");
            //카이카스 설치 팝업 
            const provider = window['klaytn']
            
            console.log(provider);
            //AlretText("카이카스 오류", "카이카스가 설치되어 있지 않습니다.");

        }        
    }
    */
    return (
        <form> 
        </form>
    )
}

export default Login;

/*
<button onClick={() => onClickKaikas()}>{Address}</button>
            <LoginModal onShow={modalOpen} onHide={()=>setModalOpen(false)}/>

            <button onClick={( ) => setModalOpen(true)}>{Address}</button>
*/