import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Menu.css';

function ModalLink(props) {
  return (
    <Modal { ...props}>
      <Modal.Header closeButton>
        <Modal.Title>Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>Menu Item Here!</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.onHide}>
          Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalLink;
