import './App.css';
import { Container, Accordion, Image  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import DropFileInput from './components/drop-file-input/DropFileInput';
import { Block, Notify } from 'notiflix/build/notiflix-block-aio';
import React, { useEffect, useState, setState } from "react";


function App() {
    const title = 'OCR Vietnam by KenDzz'
    const [showHideFAccordion ,setshowHideFAccordion] = useState("false");
    const [textOCR ,settextOCR] = useState(["No data found"]);
    const [imagecrop ,setimagecrop] = useState("No data found");
    const [imagetextorc ,setimagetextorc] = useState("No data found");
    const [imagetextcrop ,setimagetextcrop] = useState(["No data found"]);
    const [imageupload ,setimageupload] = useState(["No data found"]);

    const onFileChange = (files) => {
        if(files.length > 0){
            Block.pulse('.drop-file-input', 'Please wait for data verification...');
            eKYC(files)
        }
    }


    
    useEffect(() => {
        document.title = title;
    }, [title]);
    

    function eKYC(files) {
        const formData = new FormData();
        formData.append('files',files[0])
        axios({
            method: 'post',
            url: 'http://localhost:8000/eKYC/',
            data: formData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then(res =>{
            Block.remove(".drop-file-input");
            setshowHideFAccordion('true')
            settextOCR(res['data']['text']);
            setimagecrop(res['data']['imagecrop'])
            setimagetextorc(res['data']['imagetextorc'])
            setimagetextcrop(res['data']['imagetextcrop'])
            setimageupload(res['data']['imageupload'])
        })
    }

    return (
        <Container>
            <div className="box">
                <h2 className="header">
                    Citizen Identification Card Vietnam OCR
                    <p><a href='http://localhost:8000/' target="_blank">API Documentation Guide</a></p>
                    <span className="footer">Developed by <a href='https://www.facebook.com/Rin.Boss.Rin/' target="_blank">KenDzz</a></span>
                </h2>
                <DropFileInput
                    onFileChange={(files) => onFileChange(files)}
                />
                {showHideFAccordion == 'true' ?
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Image Upload</Accordion.Header>
                            <Accordion.Body>
                                <img className="d-block w-100" src={imageupload} alt="Image Crop"/>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Text OCR</Accordion.Header>
                            <Accordion.Body>
                                {textOCR.map(s=><React.Fragment>- {s}<br/></React.Fragment>)}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Image Crop</Accordion.Header>
                            <Accordion.Body>
                                <img className="d-block w-100" src={imagecrop} alt="Image Crop"/>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Detect text in image</Accordion.Header>
                            <Accordion.Body>
                                <img className="d-block w-100" src={imagetextorc} alt="Detect text in image"/>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>Image Text Crop</Accordion.Header>
                            <Accordion.Body>
                                {imagetextcrop.map(img=><React.Fragment><img className="d-block mt-2" src={img} alt="Image Text Crop"/></React.Fragment>)}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion> : null }
            </div>
        </Container>
    );
}

export default App;
