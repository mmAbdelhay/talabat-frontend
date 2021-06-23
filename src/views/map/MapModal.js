import React, { useState,useEffect } from 'react';
import { Modal, Button } from 'antd';
import Map from './Map';
export default function MapModal (props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mlat, setMlat] = useState(null);
  const [mlng, setMlng] = useState(null);
  
  // useEffect(()=>{
  //      setMlat(parseFloat(localStorage.getItem("searchlat")));
  //      setMlng(parseFloat(localStorage.getItem("searchlng")));
       
  // },[mlat,mlng])
  const showModal = () => {
    setIsModalVisible(true);
  };
  

  const handleOk = () => {
    
    let backLat;
    let backLng
    if (mlat==null && mlng==null){
      backLat = parseFloat(localStorage.getItem("searchlat")) ;
      backLng = parseFloat(localStorage.getItem("searchlng")) ;
    }
    else {
       backLat = mlat ;
       backLng = mlng;
    }
   
    sessionStorage.setItem('nearlat', JSON.stringify(backLat));
    sessionStorage.setItem('nearlng', JSON.stringify(backLng));
    if(props.operation === "nearprovider"){
    window.location.href = '/nearestProvides';
    }
    
    setIsModalVisible(false);
    

  };



  return (
    <div>
      <Button type="primary" style={{width:'120px',height:'50px',borderRadius:'5px'}}  onClick={showModal}>
       Lets Go
      </Button>
      <Modal title="Delivery Address"  visible={isModalVisible}  footer={[
            
            <Button key="submit" type="primary" onClick={handleOk}>
              Submit
            </Button>,
           
          ]}>
      <Map
					google={props.google}
          optype = {props.operation}
          nuLat = {parseFloat(localStorage.getItem("searchlat"))?parseFloat(localStorage.getItem("searchlat")):18.5204}
          nuLng = {parseFloat(localStorage.getItem("searchlng")) ?parseFloat(localStorage.getItem("searchlng")) :73.8567}
          onLatChange={(value) => setMlat(value)}
          onLngChange={(value) => setMlng(value)}
					center={{lat: 18.5204, lng: 73.8567}}
					height='300px'
					zoom={15}
				/>
       
      </Modal>
    </div>
  );
};

