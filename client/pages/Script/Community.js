import React, { Component } from 'react';
import MainTitle from "../MainTitle";
import Title from '../../styles/Title.module.css';

//import { CKEditor } from "@ckeditor/ckeditor5-react";
//import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

/*
class MyComponent extends React.Component {
    state = {isServer: true};
    
    componentDidMount() {
        // SSR doesn't fire ComponentDidMount, so we import CKEditor inside of it and store it as a component prop
        this.CKEditor = require("@ckeditor/ckeditor5-react");
        this.ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
        this.setState({ isServer: false }); // We just do this to toggle a re-render
    }

    render(){        
        return(
                {this.CKEditor && (<this.CKEditor editor={this.ClassicEditor}
            
                data="<p>Hello from CKEditor 5!</p>"
                onReady={editor => {
                    console.log('Editor is ready to use!', editor);
                }}             
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}                   
            
            />)})
            
    }
}


export default MyComponent;
*/


{/* 
const Community = ()=>{
    return (
        <div>
            <MainTitle />
            <h3>Hi Im Community</h3>
            <div className={Title.App}>
                <div className={Title.form_wrapper}>
                    <input className={Title.title_input} type='text' placeholder='제목' />
                    <CKEditor
                        editor={ClassicEditor}
                        data="<p>Hello from CKEditor 5!</p>"
                        onReady={editor => {
                            console.log('Editor is ready to use!', editor);
                        }}             
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}                        
                    />
                </div>
                <button className={Title.submit_button}>입력</button>
            </div>
        </div>
    )
}
*/}
//export default Community;



const Community = ()=>{
    return (
        <div>
            <MainTitle />
            <h3>Hi Im Community</h3>
            <div className={Title.App}>
                <div className={Title.form_wrapper}>
                    <input className={Title.title_input} type='text' placeholder='제목' />
                </div>
                <button className={Title.submit_button}>입력</button>
            </div>
        </div>
    )
}

export default Community;