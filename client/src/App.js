import React, { useState, useEffect } from "react";
import "./App.css";
//import AddIcon from "@mui/icons-material/Add";

// We use Route in order to define the different routes of our application
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "react-bootstrap";

import HeroTabs from "./HeroTabs.js";
import HeroCanvas from "./components/HeroCanvas.js";
import AppInfo from "./components/AppInfo.js";
import { DisplayContext } from "./DisplayContext.js";

import { useSelector } from "react-redux";
import bg from "./background.png";

const App = (props) => {
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

  const [displayFloret, setDisplayFloret] = useState(false);

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
            <HeroCanvas sendWidth={(width) => setWidth(width + 5)} />
          </Col>
          <Col style={{ padding: 0, paddingTop: "5px" }}>
            <DisplayContext.Provider value={{ display, backpack, grima }}>
              <HeroTabs />
            </DisplayContext.Provider>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
