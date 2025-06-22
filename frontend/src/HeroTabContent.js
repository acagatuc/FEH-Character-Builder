import React from "react";
import HeroComponent from "./components/hero/HeroComponent.js";

export default function HeroTabContent(props) {
  return (
    <div hidden={props.value !== props.index}>
      <HeroComponent id={props.value} />
    </div>
  );
}
