import React, { useState } from "react";
import { TextField } from "@mui/material";
import "./HeroComponent.css";

export default function BuffComponent(props) {
  const [atkBuff, setAtkBuff] = useState("");

  const handleChange = (e, value) => {
    console.log(value);
    if (value === 0) {
      props.onChange(value);
    }
    props.onChange(value);
  };
  return (
    <div>
      Buffs Debuffs
      <div className="buffs">
        <span className="buff-label">Atk</span>
        <div className="buff-debuff">
          <TextField className="buff" value={atkBuff} disabled={!props.hero.exists} type="number" variant="outlined" />
          <TextField className="buff" disabled={!props.hero.exists} type="number" variant="outlined" />
        </div>
      </div>
      <div className="buffs">
        <span>Spd</span>
        <TextField className="buff" type="number" variant="outlined" />
        <TextField className="buff" type="number" variant="outlined" />
      </div>
      <div className="buffs">
        <span>Def</span>
        <TextField className="buff" type="number" variant="outlined" />
        <TextField className="buff" type="number" variant="outlined" />
      </div>
      <div className="buffs">
        <span>Res</span>
        <TextField className="buff" type="number" variant="outlined" />
        <TextField className="buff" type="number" variant="outlined" />
      </div>
    </div>
  );
}
