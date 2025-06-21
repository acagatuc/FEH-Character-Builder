import React, { useState } from "react";
import { Modal, Button, Container, Col, Row } from "react-bootstrap";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Switch, FormControlLabel, IconButton } from "@mui/material";

//importing mui icon and css
import GitHubIcon from "@mui/icons-material/GitHub";
import "../App.css";

//redux imports
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../redux/actions";

const AppInfo = (props) => {
  const [show, setShow] = useState(false);
  const nameDisplay = useSelector((state) => state.display.name_display);
  const backpack = useSelector((state) => state.display.backpack);
  const grima = useSelector((state) => state.display.grima);
  const fehnix = useSelector((state) => state.display.fehnix);
  const grouped = useSelector((state) => state.display.grouping);
  const duo = useSelector((state) => state.display.duo_display);
  const tab_image = useSelector((state) => state.display.tab_image);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e, value) => {
    if (value !== null) {
      dispatch(actions.changeNameDisplay(value));
    }
  };
  const changeBackpack = (e, value) => {
    dispatch(actions.changeBackpack(value));
  };
  const changeGrima = (e, value) => {
    dispatch(actions.changeGrima(value));
  };
  const changeFehnix = (e, value) => {
    dispatch(actions.changeFehnix(value));
  };
  const changeDuoDisplay = (e, value) => {
    if (value !== null) {
      dispatch(actions.changeDuoDisplay(value));
    }
  };
  const changeGrouping = (e, value) => {
    dispatch(actions.changeGrouping(value));
  };
  const changeTabImageDisplay = (e, value) => {
    if (value !== null) {
      dispatch(actions.changeTabImageDisplay(value));
    }
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

      <Modal show={show} onHide={handleClose} dialogClassName="modal-size">
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <h5>Hero Name Display</h5>
                <Row style={{ width: "100%" }}>
                  <ToggleButtonGroup value={nameDisplay} onChange={handleChange} exclusive color="warning">
                    <ToggleButton value="full_name">Full Name</ToggleButton>
                    <ToggleButton value="common_name">Common Name</ToggleButton>
                    {/* <ToggleButton value="abbrev">Abbreviated</ToggleButton> */}
                  </ToggleButtonGroup>
                </Row>
                <Row style={{ width: "92%" }}>
                  <div style={{ display: "inline-flex", justifyContent: "right" }}>
                    <FormControlLabel
                      control={<Switch checked={backpack} onChange={changeBackpack} />}
                      label={"Display Backpack"}
                      labelPlacement="start"
                    />
                  </div>
                </Row>
                <Row style={{ width: "92%" }}>
                  <div style={{ display: "inline-flex", justifyContent: "right" }}>
                    <FormControlLabel control={<Switch checked={grima} onChange={changeGrima} />} label={"Display Grima"} labelPlacement="start" />
                  </div>
                </Row>
                <Row style={{ width: "92%" }}>
                  <div style={{ display: "inline-flex", justifyContent: "right" }}>
                    <FormControlLabel
                      control={<Switch checked={fehnix} onChange={changeFehnix} />}
                      label={"Display Fehnix?"}
                      labelPlacement="start"
                    />
                  </div>
                </Row>
                <Row style={{ width: "92%" }}>
                  <div style={{ display: "inline-flex", justifyContent: "right" }}>
                    <FormControlLabel
                      control={<Switch checked={grouped} onChange={changeGrouping} />}
                      label={"Group Dropdown by Game?"}
                      labelPlacement="start"
                    />
                  </div>
                </Row>
              </Col>
              <Col>
                <Row>
                  <h5>Tabs Display</h5>
                </Row>
                <Row>
                  <label>Icon Display</label>
                </Row>
                <Row>
                  <ToggleButtonGroup value={tab_image} onChange={changeTabImageDisplay} exclusive color="warning">
                    <ToggleButton value="chibis">Chibi</ToggleButton>
                    <ToggleButton value="smallportraits">Portrait</ToggleButton>
                  </ToggleButtonGroup>
                </Row>
                <Row>
                  <label>Duo Chibi Display</label>
                </Row>
                <Row>
                  <ToggleButtonGroup value={duo} onChange={changeDuoDisplay} exclusive color="warning">
                    <ToggleButton value="">Both</ToggleButton>
                    <ToggleButton value="+Main">Lead Only</ToggleButton>
                    <ToggleButton value="+Sub">Sub Only</ToggleButton>
                  </ToggleButtonGroup>
                </Row>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <IconButton onClick={() => window.open("https://github.com/acagatuc/FEH-Character-Builder/", "_blank", "noopener,noreferrer")}>
            <GitHubIcon />
          </IconButton>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppInfo;
