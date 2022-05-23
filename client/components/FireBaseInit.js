//import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

//Firebase Key는 환경변수 파일에 정보를 넣어 저장하는것이 옳은 방법
//현재는 임시방편
const firebaseConfig = {
    apiKey: "AIzaSyDo0OT5SqfAESCnsyoDZbC3RVGwS-SBiAY",
    authDomain: "levelfunction-test.firebaseapp.com",
    databaseURL: "https://levelfunction-test-default-rtdb.firebaseio.com",
    projectId: "levelfunction-test",
    storageBucket: "levelfunction-test.appspot.com",
    messagingSenderId: "1074125374477",
    appId: "1:1074125374477:web:4722e06c1329a49035c144",
    measurementId: "G-P2BTB8WEV7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseDB = firebase.database();
const firebaseStore = firebaseApp.firestore();

//export default initializeApp(firebaseConfig);

//export default firebase;
//export default firebaseDB;
export default firebaseStore;



