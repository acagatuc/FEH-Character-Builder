import React, { useState } from "react";
import { Modal, Button, Container, Col, Row } from "react-bootstrap";
import { IconButton, Collapse } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

//css and icons
import "../App.css";
import "./Barracks.css";
import Close from "@mui/icons-material/Close";
import ExpandIcon from "@mui/icons-material/ExpandMore";
import CollapseIcon from "@mui/icons-material/ExpandLess";

//redux imports
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../redux/actions";
import { store } from "../redux/store";

const SavedBuildInBarracks = (props) => {
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const openDeleteConfirmation = (i) => {
    dispatch(actions.deleteBuildFromBarracks(i));
  };
  const showCollapsedInfo = (bool) => {
    setIsCollapsed(!bool);
  };
  const loadBuildFromBarracks = (build, id) => {
    dispatch(actions.loadBuildFromBarracks(build, id));
    props.afterLoad();
  };

  return (
    <Card variant="outlined" sx={{ margin: "6px", maxWidth: "150px", minHeight: "100px", padding: "0px" }}>
      <CardContent className="buildCard">
        <Row className="titleRow">
          <Col>
            <img
              className="buildIcons"
              src={"https://fehchibis.s3.amazonaws.com/" + props.item.label + ".png".replace(" ", "+")}
              align="left"
              alt="preview"
            />
          </Col>
          <Col>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {props.item.label}
              {props.id}
            </Typography>
          </Col>
        </Row>
        <Collapse in={isCollapsed}>
          {props.item.label}
          {/* <IconButton onClick={() => openDeleteConfirmation(props.item.key)}>
          <Close />
        </IconButton> */}
        </Collapse>
        <Row>
          <Col className="expandIcon">
            <IconButton onClick={() => showCollapsedInfo(isCollapsed)}>{isCollapsed ? <CollapseIcon /> : <ExpandIcon />}</IconButton>
          </Col>
          <Col className="loadButton">
            <Button onClick={() => loadBuildFromBarracks(props.item, props.id)}>Load</Button>
          </Col>
        </Row>
      </CardContent>
    </Card>
  );
};

const BarracksModal = (props) => {
  const dispatch = useDispatch();
  const barracks = useSelector((state) => state.barracks.builds);
  const length = useSelector((state) => state.barracks.key);

  return (
    <Modal show={props.show} onHide={props.onClose} dialogClassName="modal-size">
      <Modal.Header closeButton>
        <Modal.Title>Barracks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <h5>Henlo {props.id}</h5>
            </Col>
          </Row>
          <Row>
            {barracks.map(function (item) {
              return <SavedBuildInBarracks key={item.key} afterLoad={() => props.onClose()} item={item} id={props.id} />;
            })}
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

export default BarracksModal;
