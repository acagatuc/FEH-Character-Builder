import React, { useState } from "react";
import { Modal, Container, Col, Row } from "react-bootstrap";
import { Card, CardHeader, Typography, CardContent, Button, IconButton, Collapse } from "@mui/material";

//css
import "../../App.css";
import "./Barracks.css";
import { left, right } from "../../assets";
import ExpandIcon from "@mui/icons-material/ExpandMore";
import CollapseIcon from "@mui/icons-material/ExpandLess";

//redux imports
import { useSelector } from "react-redux";

const RecommendedBuild = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const showCollapsedInfo = (bool) => {
    setIsCollapsed(!bool);
  };

  return (
    <Card variant="outlined" sx={{ margin: "6px", maxWidth: "200px", minWidth: "200px" }}>
      <CardHeader
        title={
          <div style={{ fontSize: 20, textAlign: "center", fontStyle: "italic", fontWeight: "bold" }}>
            {props.build.name}
            <div
              style={{
                width: "100%",
                display: "inline-flex",
                justifyContent: "space-evenly",
                alignItems: "flex-start",
              }}
            >
              <img src={left} alt="left arrow" style={{ width: "45%", height: "5px" }} />
              <img src={right} alt="right arrow" style={{ width: "45%", height: "5px" }} />
            </div>
          </div>
        }
      />
      <CardContent className="buildCard">
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {props.build.description}
        </Typography>
        <Collapse in={isCollapsed}>
          <div className="buildSkills">
            {props.build.weapon} {props.build.refine !== "" ? "(" + props.build.refine + ")" : ""}
            <br />
            {props.build.assist}
            <br />
            {props.build.special}
            <br />
            {props.build.a}
            <br />
            {props.build.b}
            <br />
            {props.build.c}
            <br />
            {props.build.s}
          </div>
        </Collapse>
        <div className="expandIcon">
          <IconButton onClick={() => showCollapsedInfo(isCollapsed)}>{isCollapsed ? <CollapseIcon /> : <ExpandIcon />}</IconButton>
        </div>
        <div>
          <Button onClick={() => props.loadBuild(props.build)}>Load</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const RecommendedBuildsModal = (props) => {
  const loadBuild = (build) => {
    props.loadBuild(build);
    props.onClose();
  };
  return (
    <Modal show={props.show} onHide={props.onClose} dialogClassName="hero-info-modal-size">
      <Modal.Header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Modal.Title>Recommended Builds for {props.hero.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {props.recommended?.length === 0 ? (
            <div>
              There are no documented recommended builds! If you have a build to submit, please message u/baeda2 on Reddit (fun names for builds are
              encouraged!)
            </div>
          ) : (
            <div style={{ display: "inline-flex", justifyContent: "left", flexWrap: "wrap", width: "100%" }}>
              {props.recommended?.map(function (item) {
                return <RecommendedBuild key={item.name} build={item} loadBuild={loadBuild} />;
              })}
            </div>
          )}
        </Container>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default RecommendedBuildsModal;
