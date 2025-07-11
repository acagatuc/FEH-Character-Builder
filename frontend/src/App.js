import React, { useState, useEffect } from "react";
import "./App.css";

// We use Route in order to define the different routes of our application
import "bootstrap/dist/css/bootstrap.min.css";

// components for main unit builder
import HeroTabs from "./HeroTabs.js";
import HeroCanvas from "./components/canvas/HeroCanvas.js";
import AppInfo from "./components/modals/AppInfo.js";

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
  const [canvasWidth, setWidth] = useState(500);
  const [canvasHeight, setHeight] = useState(900);
  const dispatch = useDispatch();
  const [heroes, setHeroes] = useState([]);

  // useEffect(() => {
  //   function handleResize() {
  //     console.log("resized to: ", window.innerWidth, "x", window.innerHeight);
  //   }
  //   window.addEventListener("resize", handleResize);
  // });

  // gets initial hero list with names and character ids
  useEffect(() => {
    async function fetchHeroList() {
      let response = await fetch("http://localhost:5000/api/heroes/");
      response = await response.json();
      // concats hero list from response onto empty array and sets the hero list
      // setHeroes(
      //   [].concat(response).map(function (listItem) {
      //     return {
      //       full_name: listItem.full_name,
      //       common_name: listItem.common_name,
      //       origin: listItem.game,
      //     };
      //   })
      // );
      setHeroes(response);
    }

    fetchHeroList();
  }, []);

  useEffect(() => {
    dispatch(actions.fetchHeroList(heroes));
    // dispatch(actions.changeNameDisplay(""));
    // dispatch(actions.changeGrima(""));
    // dispatch(actions.changeBackpack(""));
  }, [heroes]);

  // const setUnitBuilderHeight = (height) => {
  //   if (height > canvasHeight) {
  //     setHeight(height);
  //   }
  // };

  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Welcome to the FEH Character Builder
          <AppInfo image={"https://fehportraits.s3.amazonaws.com/infoIcon.png"} />
        </h2>
      </header>
      <div className="unit-builder">
        <HeroCanvas stageWidth={canvasWidth} />
        <HeroTabs />
      </div>
    </div>
  );
};

export default App;
