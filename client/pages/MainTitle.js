import React, { useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import Title from '../styles/Title.module.css';

//import Login from './api/Login';
import Link from 'next/link';
import Image from 'next/image'

import LoginModal from './api/LoginModal';

//import * as AlertText from "./api/AlertText.js";
import AlertModal from "./api/AlertModal";

//import TestImg from "../public/Image/soonsoon.png"
//import TestImg from "../public/Image/soonsoon.png"

const MainTitle = ({Address, SetAddress,ShowAddress,SetShowAddress, setWalletType,isLogin,setIsLogin, web3, caver, onClickKaikas, onMetaMask,CoinAmount,CoinIcon }) => {
    const Name = "3PM";
    const [LoginOn, setLoginOn] = useState(false);
    const [AlertOn, setAlertOn] = useState(false);
    const CheckUnlocked = () => 
    {
        if(window.klaytn || window.ethereum)
            setLoginOn(true);
        else
            setAlertOn(true); 
    }

    return (
            <>
            <LoginModal
                show={LoginOn}
                onHide={() => setLoginOn(false)}
                onClickKaikas={onClickKaikas}
                onMetaMask={onMetaMask}
                web3={web3}
                caver={caver}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                setWalletType={setWalletType}
                Address={Address}
                SetAddress={SetAddress}
                SetShowAddress={SetShowAddress}
            />           
            <AlertModal
                show={AlertOn}
                onHide={() => setAlertOn(false)}
            />            

            <div>
                <Navbar bg="light" expand="xl">
                    <h4><Navbar.Brand href="/"><b>{Name}</b></Navbar.Brand></h4>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav className="ml-auto">
                            <div className={Title.MainMenu}><Link href="/">Home</Link></div>
                            {/*<div className={Title.MainMenu}><Link href="/Script/Community">Community</Link></div> */}
                            <div className={Title.MainMenu}><Link href="/NFT/MyNFTData"> MY NFT </Link></div>
                            <div className={Title.MainMenu}><Link href="/NFT/Minting">NFT Minting</Link></div>
                        </Nav>
                    </Navbar.Collapse>
                    {isLogin && (
                    <Nav className="mr-auto">
                    <div>
                    <Image
                        alt="Icon"
                        width="25%"
                        height="26%"
                        src={CoinIcon}
                        />
                    </div>&nbsp;
                    <div style={{textalign:"center"}}>{CoinAmount}</div>

                    &nbsp;&nbsp;&nbsp;&nbsp;
                    </Nav>
                    )
                    }
        
                    <Nav className="mr-auto">
                        <Button variant="primary" onClick={()=> { CheckUnlocked(); }} >{ShowAddress}</Button>
                    </Nav>
                </Navbar>
            </div>


        </>
    );
}

export default MainTitle;

/*         
        <div>
            <div className={Title.MainBar}>
                {Name}
            </div>           

            <div className={Title.MainMenu}><li><Link href="/">Home</Link></li></div>
            <div className={Title.MainMenu}><li><Link href="/Script/Community">Community</Link></li></div>
            <div className={Title.MainMenuRight}><Login/></div>

            <br></br><br></br>
        </div>      */


/*
<>
<LoginModal onShow={LoginOn} onHide={() => setLoginOn(false)} />

<header>
    <Navbar bg="light" expand="xl">
        <h4><Navbar.Brand href="/">{Name}</Navbar.Brand></h4>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/Script/Community">Community</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        <Nav className="mr-auto">
            <Button variant="primary" onClick={() => setLoginOn(true)} >Login</Button>
        </Nav>
    </Navbar>
</header>
</>        
*/