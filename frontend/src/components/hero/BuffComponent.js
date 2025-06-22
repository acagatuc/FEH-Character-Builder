import React, { useState } from "react";
import { TextField } from "@mui/material";
import "./HeroComponent.css";

export default function BuffComponent(props) {
  const [atkBuff, setAtkBuff] = useState("");
  const [spdBuff, setSpdBuff] = useState("");
  const [defBuff, setDefBuff] = useState("");
  const [resBuff, setResBuff] = useState("");

  const handleAtkChange = (e) => {
    if (e.target.value === 0 || e.target.value === undefined || e.target.value === "") {
      setAtkBuff("");
      props.onChange(0, parseInt(e.target.value));
    } else if (e.target.value !== "8" && e.target.value !== "-8") {
      setAtkBuff(e.target.value);
      props.onChange(0, parseInt(e.target.value));
    }
  };

  const handleSpdChange = (e) => {
    if (e.target.value === 0 || e.target.value === undefined || e.target.value === "") {
      setSpdBuff("");
      props.onChange(1, 0);
    } else if (e.target.value !== "8" && e.target.value !== "-8") {
      setSpdBuff(e.target.value);
      props.onChange(1, parseInt(e.target.value));
    }
  };

  const handleDefChange = (e) => {
    if (e.target.value === 0 || e.target.value === undefined || e.target.value === "") {
      setDefBuff("");
      props.onChange(2, parseInt(e.target.value));
    } else if (e.target.value !== "8" && e.target.value !== "-8") {
      setDefBuff(e.target.value);
      props.onChange(2, parseInt(e.target.value));
    }
  };

  const handleResChange = (e) => {
    if (e.target.value === 0 || e.target.value === undefined || e.target.value === "") {
      setResBuff("");
      props.onChange(3, parseInt(e.target.value));
    } else if (e.target.value !== "8" && e.target.value !== "-8") {
      setResBuff(e.target.value);
      props.onChange(3, parseInt(e.target.value));
    }
  };
  return (
    <div>
      <div className="buff-label">Buffs/Debuffs:</div>
      <div className="buffs">
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
        <TextField
          className="buff"
          value={spdBuff}
          onChange={handleSpdChange}
          disabled={!props.hero.exists}
          type="number"
          variant="outlined"
          label="Spd"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          className="buff"
          value={defBuff}
          onChange={handleDefChange}
          disabled={!props.hero.exists}
          type="number"
          variant="outlined"
          label="Def"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          className="buff"
          value={resBuff}
          onChange={handleResChange}
          disabled={!props.hero.exists}
          type="number"
          variant="outlined"
          label="Res"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </div>
  );
}
