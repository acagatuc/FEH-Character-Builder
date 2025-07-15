import React from "react";
import { Modal, Container, Col, Row } from "react-bootstrap";
import { Button } from "@mui/material";

//css
import "../../App.css";

//redux imports
import { useSelector } from "react-redux";

// origin game imports and owls
import {
  heroes,
  shadow_dragon,
  echoes,
  genealogy,
  thracia,
  binding_blade,
  blazing_blade,
  sacred_stones,
  path_of_radiance,
  radiant_dawn,
  awakening,
  fates,
  three_houses,
  tms,
  feh,
  fehnix,
  left,
  right,
} from "./../../assets";

export const map = {
  "Heroes": heroes,
  "Shadow Dragon/(New) Mystery" : shadow_dragon,
  "Echoes": echoes,
  "Genealogy of the Holy War": genealogy,
  "Thracia 776": thracia,
  "Blazing Blade": blazing_blade,
  "Binding Blade": binding_blade,
  "Sacred Stones": sacred_stones,
  "Path of Radiance": path_of_radiance,
  "Radiant Dawn": radiant_dawn,
  "Awakening": awakening,
  "Fates": fates,
  "Tokyo Mirage Sessions": tms,
  "Three Houses": three_houses,
  "Engage": "",
}

const HeroInfoModal = (props) => {
  const owl = useSelector((state) => state.display.fehnix);
  // TODO: LEAVE THIS FOR HARMONIC HEROES, THE DATABASE DOES NOT REFLECT THIS YET!!!!!!!!!!!!
  // TODO: MAKE THIS ITS OWN API CALL (UNSURE IF THIS WILL ACTUALLY BE POPULAR OR NOT!!!!!!!!!)

  const games = props.hero.game?.map((element) => {
    return <img style={{ width: "100px", height: "auto" }} src={map[element]} alt="origin" key={element} />;
  });

  var buttonTitle = "No 'Meet the Hero' Page";
  if (props.hero.MeetTheHeroUrl !== "") {
    buttonTitle = "Visit " + props.hero.name.split(":")[0] + "'s 'Meet the Hero' Page";
  }

  var wikiaPage = "https://fireemblem.fandom.com/wiki/" + props.hero.single_name;
  if (props.hero.single_name === "Hilda" || props.hero.single_name === "Arthur" || props.hero.single_name === "Selena") {
    wikiaPage = wikiaPage + "_(" + props.hero.origin[0].replace(" ", "_") + ")";
  }

  var owlMessenger = "";
  if (owl) {
    owlMessenger = <img className="owl-messenger" src={fehnix} alt="The Chief of the Sovereign Order of Avian Reporters." />;
  } else {
    owlMessenger = <img className="owl-messenger" src={feh} alt="The messenger owl for the Order of Heroes!" />;
  }

  return (
    <Modal show={props.show} onHide={props.onClose} dialogClassName="hero-info-modal-size" centered={false}>
      <Modal.Header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Modal.Title>Hero Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row style={{ marginBottom: "50px" }}>
            <Col md={9}>
              <div className="description-box">{props.hero.description}</div>
            </Col>
            <Col>
              <div style={{ height: "100%", width: "100%", display: "inline-flex", justifyContent: "left", alignItems: "end", position: "relative" }}>
                {owlMessenger}
              </div>
            </Col>
          </Row>
          <Row>
            <div style={{ display: "inline-flex", justifyContent: "space-evenly", alignItems: "center" }}>
              <img src={left} alt="left arrow" style={{ width: "30%", height: "20px" }} />
              <div style={{ fontSize: "20px", fontStyle: "italic", textAlign: "center" }}>Appears in:</div>
              <img src={right} alt="right arrow" style={{ width: "30%", height: "20px" }} />
            </div>
          </Row>
          <Row>
            <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>{games}</div>
            {props.hero.hero_type === "harmonic" ? (
              <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                <Button
                  variant="contained"
                  onClick={() => window.open(props.hero.harmonicConvo, "_blank", "noopener,noreferrer")}
                  style={{ padding: "5px", width: "50%" }}
                >
                  <div style={{ textTransform: "none" }}>Harmonic Hero Conversation (Youtube)</div>
                </Button>
              </div>
            ) : (
              <div></div>
            )}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "stretch", height: "100px" }}>
        <Button
          variant="contained"
          onClick={() =>
            window.open("https://feheroes.fandom.com/wiki/" + props.hero.name, "_blank", "noopener,noreferrer")
          }
          style={{ padding: "5px", paddingLeft: "10px", paddingRight: "10px", width: "25%" }}
        >
          <div style={{ textTransform: "none" }}>Visit FEH Wiki Page</div>
        </Button>
        <Button
          variant="contained"
          onClick={() => window.open(wikiaPage, "_blank", "noopener,noreferrer")}
          style={{ padding: "5px", paddingLeft: "10px", paddingRight: "10px", width: "25%" }}
        >
          <div style={{ textTransform: "none" }}>Visit Fire Emblem Wiki Page</div>
        </Button>
        <Button
          variant="contained"
          disabled={buttonTitle === "No 'Meet the Hero' Page"}
          onClick={() => window.open(props.hero.MeetTheHeroUrl, "_blank", "noopener,noreferrer")}
          style={{ padding: "5px", paddingLeft: "10px", paddingRight: "10px", width: "25%" }}
        >
          <div style={{ textTransform: "none" }}>{buttonTitle} </div>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HeroInfoModal;
