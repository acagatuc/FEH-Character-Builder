import React, { useState } from "react";
import { Tabs, Tab, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Add from "@mui/icons-material/Add";
import HeroTabContent from "./HeroTabContent.js";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./redux/actions";

// css imports
import "./App.css";

const TabLabel = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const label = useSelector((state) => state.tabList.tabList[props.id].label);
  const hero_type = useSelector((state) => state.tabList.tabList[props.id].hero.hero_type);
  const duo = useSelector((state) => state.display.duo_display);
  const tab_image = useSelector((state) => state.display.tab_image);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const copyItem = (e) => {
    props.copyTab(props.id);
    setAnchorEl(null);
  };
  const deleteItem = (e) => {
    props.deleteTab(e, props.id);
  };

  let url = "";
  if (label === "") {
    url = "";
    // } else if (props.transform) {
    //   url = ("https://feh" + tab_image + ".s3.amazonaws.com/" + label + "+Transform.png").replace(" ", "+");
  } else if ((hero_type === "harmonic" || hero_type === "duo") && duo !== "") {
    url = ("https://feh" + tab_image + ".s3.amazonaws.com/" + label + duo + ".png").replace(" ", "+");
  } else {
    url = ("https://feh" + tab_image + ".s3.amazonaws.com/" + label + ".png").replace(" ", "+");
  }

  return (
    <div className="d-flex justify-content-between align-items-center noPadding" style={{ width: "115%" }}>
      <img className="chibis" src={url} align="left" alt="Chibi" />
      <div style={{ textTransform: "none", fontSize: 16, fontWeight: "300" }}>
        {label === "" || label === undefined ? "Build " + (props.id + 1) : label}
      </div>
      <IconButton
        component="div"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        id={props.id}
        onClick={(e) => handleClick(e)}
      >
        <MoreVertIcon style={{ fontSize: 32 }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={copyItem}>Copy</MenuItem>
        <MenuItem onClick={deleteItem} disabled={props.length === 1}>
          Delete
        </MenuItem>
      </Menu>
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

function HeroTabs(props) {
  const t = useSelector((state) => state.tabList.tabList);
  const dispatch = useDispatch();

  const tabValue = useSelector((state) => state.tabList.tabValue);

  const handleTabChange = (event, value) => {
    if (value !== -1) {
      dispatch(actions.changeTab(value));
    } else {
      addTab();
    }
  };

  const addTab = () => {
    let id = t[t.length - 1].id + 1;
    dispatch(actions.addTab(id));
    dispatch(actions.changeTab(id));
  };

  const copyTab = (value) => {
    let id = t[t.length - 1].id + 1;
    dispatch(actions.copyTab(value, id));
    dispatch(actions.changeTab(id));
  };

  const deleteTab = (e, tabId) => {
    e.stopPropagation();

    // if the array is only 1 length, just return
    if (t.length === 1) {
      return;
    }

    // parse the int from the event
    let tabIDIndex = 0;

    // find the id of the index to delete and remove it
    let tabs = t.filter((value, index) => {
      if (value.id === tabId) {
        tabIDIndex = index;
      }
      return value.id !== tabId;
    });

    // find the current value of the tab component, and change it if the tab to delete is the current tab
    let curValue = parseInt(tabValue);
    if (curValue === tabId) {
      if (tabIDIndex === 0) {
        curValue = t[tabIDIndex + 1].id;
      } else {
        curValue = t[tabIDIndex].id;
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
    dispatch(actions.deleteTab(tabId));
    dispatch(actions.changeTab(curValue));
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
        {t.map((tab) => (
          <Tab
            key={tab.key.toString()}
            value={tab.id}
            label={<TabLabel id={tab.id} copyTab={copyTab} deleteTab={deleteTab} length={t.length} />}
            wrapped
            sx={{
              backgroundColor: "white",
              width: 1 / 4,
              minHeight: 0,
              pt: 0,
              pb: 0,
            }}
            disableRipple
          />
        ))}
        <Tab value={-1} label={<AddTabLabel />} sx={{ width: 10 }} />
      </Tabs>
      <Divider />
      {t.map((tab, index) => (
        <HeroTabContent key={tab.key} id={tab.id} value={tabValue} index={index} />
      ))}
    </div>
  );
}

export default HeroTabs;
