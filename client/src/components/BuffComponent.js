import React, { useState } from "react";
import { TextField } from "@mui/material";
import "./HeroComponent.css";

export default function BuffComponent(props) {
  const [atkBuff, setAtkBuff] = useState("");

  const handleAtkChange = (e) => {
    console.log(e.target.value);
    if (e.target.value === 0) {
      setAtkBuff("");
      // props.onChange(value);
      console.log("is zero");
    } else if (e.target.value !== "8" && e.target.value !== "-8") {
      setAtkBuff(e.target.value);
    }
  };
  return (
    <div>
      Buffs Debuffs
      <div className="buffs">
        <span className="buff-label">Atk</span>
        <div className="buff-debuff">
          <TextField
            className="buff"
            value={atkBuff}
            onChange={handleAtkChange}
            disabled={!props.hero.exists}
            type="number"
            variant="outlined"
            label="Atk"
            InputLabelProps={{
              shrink: true,
            }}
          />
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
