import React, { useState, useEffect } from "react";
import "./App.css";
//import AddIcon from "@mui/icons-material/Add";

// We use Route in order to define the different routes of our application
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "react-bootstrap";

import HeroTabs from "./HeroTabs.js";
import HeroCanvas from "./components/HeroCanvas.js";
import AppInfo from "./components/AppInfo.js";

import { useSelector } from "react-redux";
import { store } from "./redux/store";
import { saveState, saveBuilds } from "./redux/localStorage";
import bg from "./background.png";

store.subscribe(() => {
  saveState({
    display: store.getState().display,
    barracks: store.getState().barracks,
  });
});

const App = (props) => {
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossorigin="anonymous"
  />;

  // this is to set the width of the col so the form does not overflow
  const [canvasWidth, setWidth] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Welcome to the FEH Character Builder
          <AppInfo image={"https://fehportraits.s3.amazonaws.com/infoIcon.png"} />
        </h2>
      </header>
      <Container fluid style={{ backgroundImage: `url(${bg})`, height: "100%" }}>
        <Row>
          <Col md={4} style={{ width: canvasWidth, paddingTop: "5px", paddingLeft: "5px" }}>
            <HeroCanvas sendWidth={(width) => setWidth(width + 5)} />
          </Col>
          <Col style={{ padding: 0, paddingTop: "5px" }}>
            <HeroTabs />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
