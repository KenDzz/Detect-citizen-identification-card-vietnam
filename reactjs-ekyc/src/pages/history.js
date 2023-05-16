import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Accordion  } from 'react-bootstrap';

function MyHistory() {
  const [data, setData] = useState([]);

  	useEffect(() => {
		axios({
		method: 'get',
		url: 'http://localhost:8000/history/'
		})
		.then(res =>{
		const ress = JSON.parse(res['data']);
		setData(ress)
		})
	}, [])

  return (
    <div>
      <h2>History</h2>
	  	{data && Object.values(data).map((value, index) => 
			<Accordion >
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{index}</Accordion.Header>
                    <Accordion.Body>
                        <img className="d-block w-100" src={value.imageupload} alt="Image Crop"/>
						<Accordion>
							<Accordion.Item eventKey="0">
								<Accordion.Header>Text OCR</Accordion.Header>
									<Accordion.Body>
										{value.text}
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="1">
									<Accordion.Header>Image Crop</Accordion.Header>
									<Accordion.Body>
										<img className="d-block w-100" src={value.crop} alt="Image Crop"/>
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="2">
									<Accordion.Header>Detect text in image</Accordion.Header>
									<Accordion.Body>
										<img className="d-block w-100" src={value.imagetextorc} alt="Detect text in image"/>
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="3">
									<Accordion.Header>Image Text Crop</Accordion.Header>
									<Accordion.Body>
										{value.imagetextcrop.map(img=><React.Fragment><img className="d-block mt-2" src={img} alt="Image Text Crop"/></React.Fragment>)}
									</Accordion.Body>
								</Accordion.Item>
							</Accordion>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
		)}
   	 </div>
  );
}

export default MyHistory;
