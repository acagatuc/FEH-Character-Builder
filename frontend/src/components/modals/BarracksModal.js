import React, { useState } from "react";
import { Modal, Button, Container, Col, Row } from "react-bootstrap";
import { IconButton, Collapse, Menu, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

//css and icons
import "../../App.css";
import "./Barracks.css";
import Close from "@mui/icons-material/Close";
import ExpandIcon from "@mui/icons-material/ExpandMore";
import CollapseIcon from "@mui/icons-material/ExpandLess";
import MoreVertIcon from "@mui/icons-material/MoreVert";

//redux imports
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { store } from "../../redux/store";

const SavedBuildInBarracks = (props) => {
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const overwriteBuild = (item, id) => {
    props.copyTab(props.id);
    setAnchorEl(null);
  };
  const openDeleteConfirmation = (i) => {
    dispatch(actions.deleteBuildFromBarracks(i));
    setAnchorEl(null);
  };
  const showCollapsedInfo = (bool) => {
    setIsCollapsed(!bool);
  };
  const loadBuildFromBarracks = (build, id) => {
    props.loadBuild(build);
    props.afterLoad();
  };

  return (
    <Card variant="outlined" sx={{ margin: "6px", minWidth: "200px", maxWidth: "200px" }}>
      <CardHeader
        action={
          <>
            <IconButton onClick={() => openDeleteConfirmation(props.item.key)}>
              <Close />
            </IconButton>
          </>
        }
        avatar={
          <img
            className="buildIcons"
            src={"https://fehchibis.s3.amazonaws.com/" + props.item.label + ".png".replace(" ", "+")}
            align="left"
            alt="preview"
          />
        }
        title={
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.item.build_name}
          </Typography>
        }
      />
      <CardContent className="buildCard">
        <Collapse in={isCollapsed}>
          <div className="buildSkills">
            {props.item.weapon} {props.item.refine !== "" ? "(" + props.item.refine + ")" : ""}
            <br />
            {props.item.assist.name}
            <br />
            {props.item.special.name}
            <br />
            {props.item.aSkill.name}
            <br />
            {props.item.bSkill.name}
            <br />
            {props.item.cSkill.name}
            <br />
            {props.item.sSkill.name}
          </div>
        </Collapse>
        <div className="buildCardBottomRow">
          <div className="expandIcon">
            <IconButton onClick={() => showCollapsedInfo(isCollapsed)}>{isCollapsed ? <CollapseIcon /> : <ExpandIcon />}</IconButton>
          </div>
          <div className="loadButton">
            <Button onClick={() => loadBuildFromBarracks(props.item, props.id)}>Load</Button>
          </div>
        </div>
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
          {barracks.length === 0 ? (
            <div>Your Barracks are empty! Make sure to save builds to grow your barracks to up to 12 builds!</div>
          ) : (
            <div className="barracksCards">
              {barracks.map(function (item) {
                return (
                  <SavedBuildInBarracks key={item.key} loadBuild={props.loadBuild} afterLoad={() => props.onClose()} item={item} id={props.id} />
                );
              })}
            </div>
          )}
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
