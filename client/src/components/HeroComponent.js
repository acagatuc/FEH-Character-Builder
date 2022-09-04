import React, { useState, useEffect } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

export default function HeroComponent(props) {
  const [hero, setHero] = useState({
    name: "",
    single_name: "",
    title: "",
    hp: [],
    atk: [],
    spd: [],
    def: [],
    res: [],
    totalStats: [],
    heroSkills: {
      weapon: [],
      assist: [],
      special: [],
      passives: [],
    },
    weapon_type: "",
    move_type: "",
    character_type: "",
    merges: 0,
    blessing: "",
    eVA: "",
    artist: "",
    exists: false,
    dragonflowers: 0,
  });
}
