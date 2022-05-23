import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Container } from "react-bootstrap";



const LoginModal = ({ show, onHide }) => {

  const [Address, SetAddress] = useState('Login');

  const kaikasLogin = async () => {
    console.log("On Login Function");
    const wallet = await window.klaytn.enable();
    const version = await window.klaytn.networkVersion;
    const selectedId = await window.klaytn.selectedAddress;

    if (selectedId != 'undefined') 
    {     
      console.log("Version :" + version);
      console.log("ID : " + selectedId);
      SetAddress(selectedId);
      //쿠키 세션에 Id값 저장 
      //추후에, ID에 맞는 닉네임 보여지게끔
      window.sessionStorage.setItem('ID', selectedId);

      //모달창 Off
      onHide(false);
    }
    else
    {
      Alert("지갑 로그인 오류");
      window.sessionStorage.removeItem('ID');
    }
  }
 
  //설치되어있는 실제 카이카스 지갑이 로그인이 되어있는지를 확인
  const onClickKaikas = () => 
  {
    if (window.klaytn) {
      if (window.klaytn.isKaikas) 
      {
        //로그인/회원가입 진행                
        const LoginID = window.sessionStorage.getItem('ID');
        if (LoginID !== null) {
          //로그아웃
          console.log("kaikas Out");
          window.sessionStorage.removeItem('ID');
          SetAddress('Login');
        }
        else {
          console.log("kaikas Login!");
          kaikasLogin();
        }
      }

    }
    else {
      //alert("kaikas를 다운받아주세요");
      console.log("kaikas unInstall");
      /*
          //카이카스 계정이 변경 됐는지 확인하는 함수
          //기존에 계정과 다르다면, 로그아웃 처리를 해야한다
          klaytn.on('accountsChanged', function(accounts) {
          // Your code
          })                                
      */
    }
  }

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            로그인
          </Modal.Title>
        </Modal.Header>
        <br /><br />
        <Modal.Body className="modal-dialog-centered">
          <figure className="text-center modal-dialog modal-dialog-centered">
            <h5>
              지갑을 이용하여 LevelZero에 로그인 합니다.<br />
              아래 지갑을 로그인 해주세요.
            </h5>
          </figure>
        </Modal.Body>
        <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="outline-dark" className="btn btn-lg"
                >MetaMask 로그인</Button>
        </Modal.Body>        
        <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="outline-dark" className="btn btn-lg"
                onClick={() =>{onClickKaikas();  }}>KaiKas 로그인</Button>
        </Modal.Body>
        <br/><br/><br/>
        {
        //<Modal.Footer>
        //  <Button onClick={onHide}>Close</Button>
        //</Modal.Footer>
        }

      </Modal>
      
    </>
  );
};
export default LoginModal;

/* 메타마스크 지갑 
https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents
useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web = new Web3(window.ethereum);
        setWeb3(web);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);
  
const connectWallet = async () => {
    accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    setWalletType("eth");
};

//카이카스
useEffect(() => {
    if (typeof klaytn !== "undefined") {
      try {
        const caver = new Caver(klaytn);
        setCaver(caver);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);
  
const connectKaikas = async () => {
	accounts = await klaytn.enable();
    setAccount(accounts[0]);
    setWalletType("klay");
};
*/


  
/*
<div class="modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
*/

/*
        <Modal
          onShow={onShow}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Modal heading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Centered Modal</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
*/

/*
      <Container>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          로그인
        </Modal.Title>
      </Modal.Header>
      <Modal.Body class="modal-dialog-centered">
        <figure class="text-center modal-dialog modal-dialog-centered">
        <h5>
          지갑을 이용하여 LevelZero에 로그인 합니다.<br/>
                 아래 지갑을 로그인 해주세요.
        </h5>  
        </figure>
        </Modal.Body>
        <Modal.Body class="modal-dialog-centered">
        <div class="modal-dialog modal-dialog-centered">
          <Button class="btn btn-outline-dark btn-lg" onClick={onHide}>KaiKas 로그인</Button>
          <p>
          사용 중인 지갑이 없으신가요? 
          <a href="#" class="alert-link">KaiKas 다운로드</a>
          </p>          
          </div>
          </Modal.Body>              
      </Container>
    </Modal>
*/