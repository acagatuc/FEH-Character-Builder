import React, { useState, useEffect } from "react";
import "./App.css";
//import AddIcon from "@mui/icons-material/Add";

// We use Route in order to define the different routes of our application
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "react-bootstrap";

import HeroTabs from "./HeroTabs.js";
import HeroCanvas from "./components/HeroCanvas.js";
import AppInfo from "./components/AppInfo.js";

//redux imports
import { store } from "./redux/store";
import { saveState, saveBuilds } from "./redux/localStorage";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./redux/actions";
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
  const dispatch = useDispatch();
  const [heroes, setHeroes] = useState([]);

  // gets initial hero list with names and character ids
  useEffect(() => {
    async function fetchHeroList() {
      let response = await fetch("http://localhost:5000/Heroes/");
      response = await response.json();

      // concats hero list from response onto empty array and sets the hero list
      setHeroes(
        [].concat(response).map(function (listItem) {
          return {
            character_id: listItem.character_id,
            full_name: listItem.full_name,
            name_title: listItem.name_title,
            abbreviated: listItem.abbreviated,
            backpack: listItem.backpack,
            origin: listItem.origin,
          };
        })
      );
    }

    fetchHeroList();
  }, []);

  useEffect(() => {
    dispatch(actions.fetchHeroList(heroes));
    dispatch(actions.changeNameDisplay(""));
    dispatch(actions.changeGrima(""));
    dispatch(actions.changeBackpack(""));
  }, [heroes]);

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
