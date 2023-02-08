import React from "react";
import { TextField } from "@mui/material";
import "./HeroComponent.css";

export default function BuffComponent(props) {
  const handleChange = (e, value) => {
    props.onChange(value);
  };
  return (
    <div className="row">
      <div className="buffs">
        <span>Atk</span>
        <div className="buff-debuff">
          <TextField className="buff" type="number" variant="outlined" />
        </div>
      </div>
      <div className="buffs">
        <span>Spd</span>
        <TextField className="buff" type="number" variant="outlined" />
      </div>
      <div className="buffs">
        <span>Def</span>
        <TextField className="buff" type="number" variant="outlined" />
      </div>
      <div className="buffs">
        <span>Res</span>
        <TextField className="buff" type="number" variant="outlined" />
      </div>
    </div>
  );
}
