import React, { useState, useEffect } from "react";
import "./App.css";

// We use Route in order to define the different routes of our application
import "bootstrap/dist/css/bootstrap.min.css";

// components for main unit builder
import HeroTabs from "./components/navigation/HeroTabs.js";
import TabComponent from "./components/navigation/TabComponent.js"
import HeroCanvas from "./components/canvas/HeroCanvas.js";
import AppInfo from "./components/modals/AppInfo.js";

//redux imports
import { store } from "./rtk/store";
// import { saveState, saveBuilds } from "./redux/localStorage";
import { useSelector, useDispatch } from "react-redux";
// import * as actions from "./rtk/actions";
import bg from "./background.png";
import { loadHeroList } from './rtk/displaySlice';

import useWindowDimensions from './utils/WindowDimensions.js'

// store.subscribe(() => {
//   saveState({
//     display: store.getState().display,
//     barracks: store.getState().barracks,
//   });
// });

const App = (props) => {
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossorigin="anonymous"
  />;

  // this is to set the width of the col so the form does not overflow
  const {width, height}= useWindowDimensions();
  const [canvasWidth, setWidth] = useState(() => {
    if (width > 2100){
      return 700;
    }
    else if (width < 500) {
      return width;
    }
    else {
      return 500
    }
  });
  const [canvasHeight, setHeight] = useState(900);
  const dispatch = useDispatch();

  // gets initial hero list with names and character ids
  useEffect(() => {
    async function fetchHeroList() {
      let response = await fetch("http://localhost:5000/api/heroes/");
      response = await response.json();
      dispatch(loadHeroList(response))
    }
    fetchHeroList();
  }, []);

  // useEffect(() => {
  //   dispatch(fetchHeroList(heroes));
  //   // dispatch(actions.changeNameDisplay(""));
  //   // dispatch(actions.changeGrima(""));
  //   // dispatch(actions.changeBackpack(""));
  // }, [heroes]);

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
        <TabComponent />
      </div>
    </div>
  );
};

export default App;
