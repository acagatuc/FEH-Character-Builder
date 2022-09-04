import React, { useState, useEffect } from "react";
import { Tabs, Tab, TabContentPanel } from "@mui/material";
import DisplayHeroes from "./components/DisplayHeroes.js";

export default function HeroTabContent(props) {
  const [display, setDisplay] = useState(props.value === props.index);
  return (
    <div hidden={props.value !== props.index}>
      <DisplayHeroes />
    </div>
  );
}
