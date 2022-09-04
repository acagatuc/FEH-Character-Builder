import React, { useState, useEffect } from "react";
import { Tabs, Tab, TabContentPanel, Button } from "@mui/material";
import Close from "@mui/icons-material/Close";
import Add from "@mui/icons-material/Add";
import HeroTabContent from "./HeroTabContent.js";
import DisplayHeroes from "./components/DisplayHeroes.js";

export default function HeroTabs(props) {
  const [tabList, setTabList] = useState([
    {
      key: 0,
      id: 0,
    },
  ]);

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, value) => {
    setTabValue(value);
  };

  const addTab = () => {
    let id = tabList[tabList.length - 1].id + 1;
    setTabList([...tabList, { key: id, id: id }]);
  };

  const deleteTab = (e, tabId) => {
    e.stopPropagation();

    // if the array is only 1 length, just return
    if (tabList.length === 1) {
      return;
    }

    // parse the int from the event
    let tabIDIndex = 0;

    // find the id of the index to delete and remove it
    let tabs = tabList.filter((value, index) => {
      if (value.id === tabId) {
        tabIDIndex = index;
      }
      return value.id !== tabId;
    });

    // find the current value of the tab component, and change it if the tab to delete is the current tab
    let curValue = parseInt(tabValue);
    if (curValue === tabId) {
      if (tabIDIndex === 0) {
        curValue = tabList[tabIDIndex + 1].id;
      } else {
        curValue = tabList[tabIDIndex].id;
      }
    }

    // if the current value is too large, set it equal to the rightmost tab
    if (curValue >= tabs.length) {
      curValue = tabs.length - 1;
    }

    // loop through tabs and change ids
    for (let i = tabId; i < tabs.length; i++) {
      tabs[i].id = tabs[i].id - 1;
    }

    // set current tab and tab list
    setTabValue(curValue);
    setTabList(tabs);
  };

  return (
    <div>
      <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
        {tabList.map((tab) => (
          <Tab
            key={tab.key.toString()}
            value={tab.id}
            label={"Node " + tab.id}
            icon={<Close id={tab.id} onClick={(e) => deleteTab(e, tab.id)} />}
            iconPosition="end"
          />
        ))}
      </Tabs>
      <Button variant="outlined" onClick={addTab}>
        <Add />
      </Button>
      {tabList.map((tab, index) => (
        <HeroTabContent key={tab.key} value={tabValue} index={index} />
      ))}
    </div>
  );
}
