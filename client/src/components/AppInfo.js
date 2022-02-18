import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const AppInfo = ({ image }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <input
        type="image"
        src={image}
        onClick={handleShow}
        alt="modal containing website/code info"
        style={{
          float: "right",
          height: "45px",
          paddingTop: "2px",
          paddingRight: "10px",
        }}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This is where I will put more information and a link to my github
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppInfo;
