import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import Home from './Home';
const MapModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
       Lets Go
      </Button>
      <Modal title="Delivery Address" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Home />
      </Modal>
    </>
  );
};

export default MapModal;