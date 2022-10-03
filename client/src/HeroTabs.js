import React, { useState } from "react";
import { Tabs, Tab, Divider, Box, IconButton } from "@mui/material";
import Close from "@mui/icons-material/Close";
import Add from "@mui/icons-material/Add";
import HeroTabContent from "./HeroTabContent.js";

export default function HeroTabs(props) {
  const [tabList, setTabList] = useState([
    {
      key: 0,
      id: 0,
      label: "",
      hero: {},
      stats: [],
      merges: 0,
      resplendent: false,
      blessing: "",
      background: "",
    },
  ]);

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, value) => {
    if (value !== -1) {
      setTabValue(value);
    } else {
      addTab();
    }
  };

  const addTab = () => {
    let id = tabList[tabList.length - 1].id + 1;
    let key = tabList[tabList.length - 1].key + 1;
    setTabList([...tabList, { key: key, id: id, label: "", hero: {} }]);
    setTabValue(id);
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
    } else if (curValue > tabId) {
      curValue = curValue - 1;
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

  const changeHero = (event) => {
    props.onChange(event);
    tabList[tabValue].hero = event;
    tabList[tabValue].label = event.singleName;
  };

  const changeStats = (stats, merges, levels) => {
    tabList[tabValue].stats = stats;
    tabList[tabValue].merges = merges;
    props.changeStats(stats, merges, levels);
  };

  const changeSkills = (event) => {
    props.changeSkills(event);
  };

  const changeResplendent = (event) => {
    tabList[tabValue].resplendent = event;
    props.changeResplendent(event);
  };

  const changeBlessing = (event) => {
    tabList[tabValue].blessing = event;
    props.changeBlessing(event);
  };

  const changeBackground = (event) => {
    tabList[tabValue].background = event;
    props.changeBackground(event);
  };

  return (
    <div style={{ borderRadius: 10, backgroundColor: "white" }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{ style: { background: "#282c34", transition: "none" } }}
        TabScrollButtonProps={{ style: { background: "#282c34", color: "white" } }}
        sx={{
          height: 10,
          maxWidth: "90%",
          borderTopLeftRadius: 10,
          "& :hover": { backgroundColor: "#ebebeb", color: "red" },
        }}
      >
        >
        {tabList.map((tab) => (
          <Tab
            key={tab.key.toString()}
            value={tab.id}
            label={
              <div style={{ textTransform: "none" }}>
                {tab.label === "" ? "Build " + (tab.id + 1) : tab.label}
              </div>
            }
            icon={
              <div
                style={{ display: tabList.length === 1 ? "none" : "block" }}
                onClick={(e) => deleteTab(e, tab.id)}
              >
                <Close id={tab.id} />
              </div>
            }
            iconPosition="end"
            wrapped
            sx={{
              backgroundColor: "white",
              width: 1 / 6,
              minHeight: 0,
              pt: 0,
              pb: 0,
            }}
            disableRipple
          />
        ))}
        <Tab key={-1} value={-1} icon={<Add style={{ color: "black" }} />} sx={{ width: 10 }} />
      </Tabs>
      <Divider />
      {tabList.map((tab, index) => (
        <HeroTabContent
          key={tab.key}
          id={tab.id}
          value={tabValue}
          index={index}
          onChange={changeHero}
          changeStats={changeStats}
          changeSkills={changeSkills}
          changeResplendent={changeResplendent}
          changeBlessing={changeBlessing}
          changeBackground={changeBackground}
        />
      ))}
    </div>
  );
}
