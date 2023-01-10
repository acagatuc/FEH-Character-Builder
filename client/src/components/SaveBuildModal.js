import React, { useState } from "react";
import { Modal, Button, Container, Col, Row } from "react-bootstrap";
import TextField from "@mui/material/TextField";

//css
import "../App.css";

//redux imports
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../redux/actions";
import { store } from "../redux/store";

const SaveBuildModal = (props) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const addBuild = () => {
    dispatch(actions.addBuildToBarracks(name, props.tab));
    setName("");
    props.onClose();
  };

  return (
    <Modal show={props.show} onHide={props.onClose} dialogClassName="modal-size">
      <Modal.Header closeButton>
        <Modal.Title>Barracks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <h5>Save Build?</h5>
            </Col>
            <TextField value={name} onChange={(e) => setName(e.target.value)} label={"Build Name"} />
            <Button onClick={addBuild}>Add</Button>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SaveBuildModal;
