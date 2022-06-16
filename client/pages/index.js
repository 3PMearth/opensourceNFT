import Head from 'next/head';
import Image from 'next/image'
import styles from '../styles/Home.module.css';

import MainTitle from "./MainTitle";
import TestImg from "../public/Image/soonsoon.png"


export default function Home() {
 

  return (
    <div>
      <Head>
        <title>3PM NFT Test</title>
        <meta name="description" content="Generated by Level Zero Test"/>
      </Head>      
      
      <div>      
      <h3>Home</h3>
      
      <h4>3PM NFT 오픈소스 라이브러리 입니다</h4>
      <h4>클레이튼, 이더리움, 폴리곤을 지원합니다</h4>
      {/*
      <h4>3. 스마트컨트랙트란? 무엇인지 찾아보기</h4>
      <h4>4. NFT 뉴스 페이지 제작</h4>
      <h4>5. 카이카스 지갑에서 전송 버튼 누르면, 보내지는 형태가 나오도록 해보기</h4>
      <h4>6. 게시판API Build 되게 수정</h4>
       */}
      </div>
      
      <div className="HomeImageContainer">
        <Image src={TestImg}/>
      </div>
    </div>
  )
}
