import React from "react";
import { Modal, Container, Col, Row } from "react-bootstrap";
import { Card, CardHeader, Typography, CardContent, Button } from "@mui/material";

//css
import "../App.css";
import { left, right } from "../assets";

//redux imports
import { useSelector } from "react-redux";

const RecommendedBuild = (props) => {
  return (
    <Card variant="outlined" sx={{ margin: "6px", width: "33%" }}>
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
            <div style={{ display: "inline-flex", justifyContent: "left", wrap: "wrap", width: "100%" }}>
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
