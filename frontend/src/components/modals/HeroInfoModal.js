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

const HeroInfoModal = (props) => {
  const owl = useSelector((state) => state.display.fehnix);
  const games = props.hero.origin?.map((element) => {
    var imgSrc = "";
    switch (element) {
      case "Heroes":
        imgSrc = heroes;
        break;
      case "Shadow Dragon / (New) Mystery":
        imgSrc = shadow_dragon;
        break;
      case "Echoes":
        imgSrc = echoes;
        break;
      case "Genealogy of the Holy War":
        imgSrc = genealogy;
        break;
      case "Thracia 776":
        imgSrc = thracia;
        break;
      case "The Binding Blade":
        imgSrc = binding_blade;
        break;
      case "The Blazing Blade":
        imgSrc = blazing_blade;
        break;
      case "The Sacred Stones":
        imgSrc = sacred_stones;
        break;
      case "Path of Radiance":
        imgSrc = path_of_radiance;
        break;
      case "Radiant Dawn":
        imgSrc = radiant_dawn;
        break;
      case "Awakening":
        imgSrc = awakening;
        break;
      case "Fates":
        imgSrc = fates;
        break;
      case "Three Houses":
        imgSrc = three_houses;
        break;
      case "Tokyo Mirage Sessions ♯FE Encore":
        imgSrc = tms;
        break;
      case "Engage":
        // needs to be updated with alear when i can get the img
        break;
      default:
        break;
    }
    return <img style={{ width: "100px", height: "auto" }} src={imgSrc} alt="origin" key={element} />;
  });

  var buttonTitle = "No 'Meet the Hero' Page";
  if (props.hero.MeetTheHeroUrl !== "") {
    buttonTitle = "Visit " + props.hero.single_name + "'s 'Meet the Hero' Page";
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
            window.open("https://feheroes.fandom.com/wiki/" + props.hero.single_name + ": " + props.hero.title, "_blank", "noopener,noreferrer")
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
