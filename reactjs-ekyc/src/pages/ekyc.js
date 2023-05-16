import { Button, Accordion, Modal  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import DropFileInput from '../components/drop-file-input/DropFileInput';
import { Block  } from 'notiflix/build/notiflix-block-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import React, { useEffect, useState, setState } from "react";
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';


function MyeKYC() {

    const title = 'OCR Vietnam by KenDzz'
    const [showHideFAccordion ,setshowHideFAccordion] = useState("false");
    const [textOCR ,settextOCR] = useState(["No data found"]);
    const [imagecrop ,setimagecrop] = useState("No data found");
    const [imagetextorc ,setimagetextorc] = useState("No data found");
    const [imagetextcrop ,setimagetextcrop] = useState(["No data found"]);
    const [imageupload ,setimageupload] = useState(["No data found"]);
    const [modalShow, setModalShow] = React.useState(false);

    const onFileChange = (files) => {
        console.log(files);
        if(files.length > 0){
            Block.pulse('.drop-file-input', 'Please wait for data verification...');
            eKYC(files)
        }
    }

    function handleTakePhoto (dataUri) {
        eKYCBase64(dataUri)
        console.log(dataUri)
    }
    
    
    function MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Camera
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Camera
                onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); }} 
            />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }

    useEffect(() => {
        document.title = title;
    }, [title]);
    

    function eKYC(files) {
        Loading.standard();
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
        }).catch(function (error) {
            console.log(error)
            Notify.failure('Lỗi! Vui lòng thử lại');
          }).finally(() => Loading.remove());
    }


    function eKYCBase64(files) {
        Loading.standard();
        const formData = new FormData();
        formData.append('imgBase64',files)
        axios({
            method: 'post',
            url: 'http://localhost:8000/eKYCBase64/',
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
        }).catch(function (error) {
            console.log(error)
            Notify.failure('Lỗi! Vui lòng thử lại');
          }).finally(() => Loading.remove());
    }

  return (
    <div>
        <h2 className="header">
            Citizen Identification Card Vietnam OCR
            <p><a href='http://localhost:8000/' target="_blank">API Documentation Guide</a></p>
            <p><span className="footer">Developed by <a href='https://www.facebook.com/Rin.Boss.Rin/' target="_blank">KenDzz</a></span></p>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Camera
            </Button>
        </h2>

        <DropFileInput
            onFileChange={(files) => onFileChange(files)}
        />
        

        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
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
                        {textOCR.map((s,i)=>( i > 3 ? (<React.Fragment>- {s} {i}<br/></React.Fragment>) : null ))}
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
  );
}
export default MyeKYC;
