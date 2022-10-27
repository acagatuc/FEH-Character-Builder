import React, { useState } from "react";
import { Tabs, Tab, Divider } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Add from "@mui/icons-material/Add";
import HeroTabContent from "./HeroTabContent.js";
import "./App.css";

const TabLabel = (props) => {
  const url = ("https://fehsmallportraits.s3.amazonaws.com/" + props.label + ".png").replace(" ", "+");

  return (
    <div className="d-flex justify-content-between">
      <img src={url} height="40" align="left" />
      <div style={{ textTransform: "none", fontSize: 16 }}>{props.label === "" ? "Build " + (props.id + 1) : props.label}</div>
      <MoreVertIcon style={{ fontSize: 32 }} disabled={props.length === 1} onClick={(e) => props.deleteTab(e, props.id)} id={props.id} />
    </div>
  );
};

const AddTabLabel = (props) => {
  return (
    <div style={{ textTransform: "none" }}>
      <Add style={{ color: "black" }} />
    </div>
  );
};

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
      favorite: 0,
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
    tabList[tabValue].label = event.name;
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

  const changeFavorite = (event) => {
    tabList[tabValue].favorite = event;
    props.changeFavorite(event);
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
        }}
      >
        >
        {tabList.map((tab) => (
          <Tab
            key={tab.key.toString()}
            value={tab.id}
            label={<TabLabel label={tab.label} id={tab.id} deleteTab={deleteTab} length={tabList.length} />}
            wrapped
            sx={{
              backgroundColor: "white",
              width: 1 / 2,
              minHeight: 0,
              pt: 0,
              pb: 0,
            }}
            disableRipple
          />
        ))}
        <Tab key={-1} value={-1} label={<AddTabLabel />} sx={{ width: 10 }} />
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
          displayFloret={props.displayFloret}
          changeSummonerSupport={props.changeSummonerSupport}
          changeAllySupport={props.changeAllySupport}
          changeDragonflowers={props.changeDragonflowers}
          changeFavorite={changeFavorite}
        />
      ))}
    </div>
  );
}
