import React from "react";
import "./App.css";
//import AddIcon from "@mui/icons-material/Add";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// We import all the components we need in our app
import AddSkills from "./components/addSkills.js";
import AddHeroes from "./components/addHero.js";
import DisplayHeroes from "./components/DisplayHeroes.js";
import AppInfo from "./components/AppInfo.js";

const App = () => {
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossorigin="anonymous"
  />;

  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Welcome to the FEH Character Builder
          <AppInfo
            image={"https://fehportraits.s3.amazonaws.com/infoIcon.png"}
          />
        </h2>
      </header>
      <DisplayHeroes />
    </div>
  );
};

export default App;
