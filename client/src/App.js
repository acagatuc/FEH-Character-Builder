import React, { useState, useEffect } from "react";
import "./App.css";
//import AddIcon from "@mui/icons-material/Add";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "react-bootstrap";

// We import all the components we need in our app
import AddSkills from "./components/addSkills.js";
import AddHeroes from "./components/addHero.js";
import HeroTabs from "./HeroTabs.js";
import DisplayHeroes from "./components/DisplayHeroes.js";
import HeroCanvas from "./components/HeroCanvas.js";
import AppInfo from "./components/AppInfo.js";

import background from "./background.png";

const App = () => {
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossorigin="anonymous"
  />;

  const [displayedHero, setDisplayedHero] = useState({
    name: "",
    singleName: "",
    title: "",
    merges: 0,
    totalStats: [0, 0, 0, 0, 0],
    VA: "",
    artist: "",
    moveType: "",
    weaponType: "",
    blessing: "",
    resplendent: false,
  });

  const [displayedSkills, setDisplayedSkills] = useState({
    weapon: "",
    refine: "",
    assist: "",
    special: "",
    aSkill: "",
    bSkill: "",
    cSkill: "",
    sSkill: "",
  });

  const changeDisplayedHero = (event) => {
    setDisplayedHero(event);
  };

  const changeStats = (event) => {
    setDisplayedHero({ ...displayedHero, totalStats: event });
  };

  const changeSkills = (event) => {
    setDisplayedSkills({
      ...displayedSkills,
      aSkill: event.aSkill.name,
      assist: event.assist.name,
      bSkill: event.bSkill.name,
      cSkill: event.cSkill.name,
      refine: event.refine.name,
      sSkill: event.sSkill.name,
      special: event.special.name,
      weapon: event.weapon.name,
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Welcome to the FEH Character Builder
          <AppInfo image={"https://fehportraits.s3.amazonaws.com/infoIcon.png"} />
        </h2>
      </header>
      <Container fluid style={{ backgroundImage: `url(${background})` }}>
        <Row>
          <Col md={4} style={{ paddingTop: "5px" }}>
            <HeroCanvas
              name={displayedHero.singleName}
              title={displayedHero.title}
              merges={displayedHero.merges}
              stats={displayedHero.totalStats}
              weapon={displayedSkills.weapon}
              refine={displayedSkills.refine}
              assist={displayedSkills.assist}
              special={displayedSkills.special}
              aSkill={displayedSkills.aSkill}
              bSkill={displayedSkills.bSkill}
              cSkill={displayedSkills.cSkill}
              sSkill={displayedSkills.sSkill}
              va={displayedHero.VA}
              art={displayedHero.artist}
              image={
                displayedHero.resplendent
                  ? "https://fehportraits.s3.amazonaws.com/Resplendent " +
                    displayedHero.name +
                    ".png"
                  : "https://fehportraits.s3.amazonaws.com/" + displayedHero.name + ".png"
              }
              background={"https://fehportraits.s3.amazonaws.com/bg_normal.png"}
              ui={"https://fehportraits.s3.amazonaws.com/updated ui.png"}
              move_type={"https://fehskills.s3.amazonaws.com/" + displayedHero.moveType + ".png"}
              weapon_type={
                "https://fehskills.s3.amazonaws.com/" +
                displayedHero.weaponType.toLowerCase() +
                ".png"
              }
              blessing={"https://fehskills.s3.amazonaws.com/" + displayedHero.blessing + ".png"}
            />
          </Col>
          <Col style={{ padding: 0, paddingTop: "5px" }}>
            <HeroTabs
              onChange={changeDisplayedHero}
              changeStats={changeStats}
              changeSkills={changeSkills}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
