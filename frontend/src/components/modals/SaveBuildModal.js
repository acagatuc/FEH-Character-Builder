import React, { useState } from "react";
import { Modal, Button, Container, Col, Row } from "react-bootstrap";
import TextField from "@mui/material/TextField";

//css
import "../../App.css";

//redux imports
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { store } from "../../redux/store";

const SaveBuildModal = (props) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const addBuild = () => {
    dispatch(actions.addBuildToBarracks(name, props.tab));
    setName("");
    props.onClose();
  };

  return (
    <Modal show={props.show} onHide={props.onClose} dialogClassName="save-modal-size">
      <Modal.Header closeButton>
        <Modal.Title>Barracks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <h5>Save Build?</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextField value={name} onChange={(e) => setName(e.target.value)} label={"Build Name"} variant="outlined" />
            </Col>
            <Col>
              Overwrite Specific build? add dropdown containing builds here (leave blank for new build) not sure if this will actually work, but i
              guess it might be possible to determine whetherthe user is capable of making a new build in the barracks vs when they are not.
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addBuild}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SaveBuildModal;
