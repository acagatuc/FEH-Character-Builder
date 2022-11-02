import React, { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Switch, FormControlLabel } from "@mui/material";
import { DisplayContext } from "../DisplayContext.js";

const AppInfo = (props) => {
  const [show, setShow] = useState(false);
  const [nameDisplay, setNameDisplay] = useState("full");
  const [backpack, setBackpack] = useState(false);
  const [grima, setGrima] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e, value) => {
    if (value !== null) {
      setNameDisplay(value);
      props.onChange(value);
    }
  };
  const changeBackpack = (e, value) => {
    setBackpack(value);
    props.onBackpack(value);
  };
  const changeGrima = (e, value) => {
    setGrima(value);
    props.onGrima(value);
  };

  return (
    <>
      <input
        type="image"
        src={props.image}
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
          This is where I will put more information and a link to my github link to github: https://github.com/acagatuc/FEH-Character-Builder
          <div>
            <label>Hero Name Display</label>
            <br />
            <ToggleButtonGroup value={nameDisplay} onChange={handleChange} exclusive color="warning">
              <ToggleButton value="full">Full Name</ToggleButton>
              <ToggleButton value="title">Name and Title</ToggleButton>
              <ToggleButton value="abbrev">Abbreviated</ToggleButton>
            </ToggleButtonGroup>
            <br />
            <FormControlLabel control={<Switch checked={backpack} onChange={changeBackpack} />} label={"Display Backpack"} labelPlacement="start" />
            <FormControlLabel control={<Switch checked={grima} onChange={changeGrima} />} label={"Display Grima"} labelPlacement="start" />
          </div>
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
