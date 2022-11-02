import React, { useState } from "react";

export const displays = {
  full_name: "full",
  title: "title",
  abbrev: "abbrev",
};

export const DisplayContext = React.createContext({ nameDisplay: "full", backpack: false, grima: false });
