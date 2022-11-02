import React, { useState, useEffect } from "react";
import "./App.css";
//import AddIcon from "@mui/icons-material/Add";

// We use Route in order to define the different routes of our application
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "react-bootstrap";

// We import all the components we need in our app
import AddSkills from "./components/addSkills.js";
import AddHeroes from "./components/addHero.js";
import HeroTabs from "./HeroTabs.js";
import HeroCanvas from "./components/HeroCanvas.js";
import AppInfo from "./components/AppInfo.js";
import { DisplayContext } from "./DisplayContext.js";

import bg from "./background.png";

const App = () => {
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossorigin="anonymous"
  />;

  // this is to set the width of the col so the form does not overflow
  const [canvasWidth, setWidth] = useState(0);
  const [display, setDisplay] = useState("full");
  const [backpack, setBackpack] = useState(false);
  const [grima, setGrima] = useState(false);

  const [displayedHero, setDisplayedHero] = useState({
    name: "",
    singleName: "",
    title: "",
    VA: "",
    artist: ["", ""],
    moveType: "",
    weaponType: "",
    hero_type: "",
  });

  const [displayedStats, setDisplayedStats] = useState(["", "", "", "", ""]);
  const [statColorArray, setStatColorArray] = useState(["white", "white", "white", "white", "white"]);
  const [displayedMerges, setDisplayedMerges] = useState(0);

  const [artistIndex, setArtistIndex] = useState(0);
  const [blessing, setBlessing] = useState("");
  const [background, setBackground] = useState("normal");
  const [fav, setFav] = useState("0");
  const [displayFloret, setDisplayFloret] = useState(false);
  const [dragonflowers, setDragonflowers] = useState("");
  const [summonerSupport, setSummonerSupport] = useState("");
  const [allySupport, setAllySupport] = useState("");

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

  const changeStats = (stats, merges, levels) => {
    setDisplayedStats(stats);
    setDisplayedMerges(merges);

    if (levels !== undefined) {
      var tempArray = [];
      for (var i = 0; i < 5; i++) {
        if (levels[i] === 0) {
          tempArray[i] = "#E9A3BB";
        } else if (levels[i] === 2) {
          tempArray[i] = "#B6E6F0";
        } else {
          tempArray[i] = "white";
        }
      }
      setStatColorArray(tempArray);
    } else {
      setStatColorArray(["white", "white", "white", "white", "white"]);
    }
  };

  const changeSkills = (event) => {
    setDisplayedSkills({
      ...displayedSkills,
      aSkill: event.aSkill,
      assist: event.assist,
      bSkill: event.bSkill,
      cSkill: event.cSkill,
      refine: event.refine,
      sSkill: event.sSkill,
      special: event.special,
      weapon: event.weapon,
    });
  };

  const changeResplendent = (event) => {
    var artistIndex = 0;
    if (event) {
      artistIndex = 1;
    }
    setArtistIndex(artistIndex);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Welcome to the FEH Character Builder
          <AppInfo image={"https://fehportraits.s3.amazonaws.com/infoIcon.png"} onChange={setDisplay} onBackpack={setBackpack} onGrima={setGrima} />
        </h2>
      </header>
      <Container fluid style={{ backgroundImage: `url(${bg})` }}>
        <Row>
          <Col md={4} style={{ width: canvasWidth, paddingTop: "5px", paddingLeft: "5px" }}>
            <HeroCanvas
              sendWidth={(width) => setWidth(width + 5)}
              name={displayedHero.singleName}
              title={displayedHero.title}
              merges={displayedMerges}
              stats={displayedStats}
              statColorArray={statColorArray}
              weapon={displayedSkills.weapon}
              refine={displayedSkills.refine}
              assist={displayedSkills.assist}
              special={displayedSkills.special}
              aSkill={displayedSkills.aSkill}
              bSkill={displayedSkills.bSkill}
              cSkill={displayedSkills.cSkill}
              sSkill={displayedSkills.sSkill}
              va={displayedHero.VA}
              art={displayedHero.name === "" ? "" : displayedHero.artist[artistIndex]}
              image={
                artistIndex === 1
                  ? "https://fehportraits.s3.amazonaws.com/Resplendent " + displayedHero.name + ".png"
                  : "https://fehportraits.s3.amazonaws.com/" + displayedHero.name + ".png"
              }
              background={background}
              ui={"https://fehportraits.s3.amazonaws.com/updated ui 2.png"} // if the ui is true, display something? maybe different setups like echoes or awakening or something else?
              move_type={displayedHero.moveType}
              weapon_type={displayedHero.weaponType}
              ascended_trait={displayFloret}
              dragonflowers={dragonflowers}
              badgeList={[blessing, displayedHero.hero_type, summonerSupport, allySupport]}
              fav={fav}
            />
          </Col>
          <Col style={{ padding: 0, paddingTop: "5px" }}>
            <DisplayContext.Provider value={{ display, backpack, grima }}>
              <HeroTabs
                onChange={changeDisplayedHero}
                changeStats={changeStats}
                changeSkills={changeSkills}
                changeResplendent={changeResplendent}
                changeBlessing={setBlessing}
                changeBackground={setBackground}
                displayFloret={setDisplayFloret}
                changeSummonerSupport={setSummonerSupport}
                changeAllySupport={setAllySupport}
                changeDragonflowers={setDragonflowers}
                changeFavorite={setFav}
              />
            </DisplayContext.Provider>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
