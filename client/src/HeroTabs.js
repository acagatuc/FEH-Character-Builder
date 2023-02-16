import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
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
    setAnchorEl(null);
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
    <div className="tab">
      <div style={{ display: "inline-flex" }} onClick={() => props.changeTab(null, props.id)}>
        {url === "" ? (
          <div style={{ minWidth: "45px" }}></div>
        ) : tab_image === "chibis" ? (
          <img className="chibis" src={url} align="left" alt="Chibi" />
        ) : (
          <img className="portraits" src={url} align="left" alt="Portrait" />
        )}
        <div className="tab-label">{label === "" || label === undefined ? "Build " + (props.id + 1) : label}</div>
      </div>
      <div className="tab-popup">
        <IconButton
          component="div"
          aria-controls={open ? "tab-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          id={props.id}
          onClick={(e) => handleClick(e)}
        >
          <MoreVertIcon style={{ fontSize: 32 }} />
        </IconButton>
        <Menu
          id="tab-menu"
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
      {props.id === props.value ? <div className="tab-indicator"></div> : <div></div>}
    </div>
  );
};

function HeroTabs(props) {
  const t = useSelector((state) => state.tabList.tabList);
  const dispatch = useDispatch();

  const tabValue = useSelector((state) => state.tabList.tabValue);
  const length = useSelector((state) => state.tabList.tabList.length);

  const handleTabChange = (event, value) => {
    if (value !== -1) {
      dispatch(actions.changeTab(value));
    } else {
      addTab();
    }
  };

  const addTab = () => {
    if (t.length < 10) {
      let id = t[t.length - 1].id + 1;
      dispatch(actions.addTab(id));
      dispatch(actions.changeTab(id));
    }
  };

  const copyTab = (value) => {
    // lists ofskills are not being generated at all
    if (t.length < 10) {
      let id = t[t.length - 1].id + 1;
      dispatch(actions.copyTab(value, id));
      dispatch(actions.changeTab(id));
    }
  };

  const deleteTab = (e, tabId) => {
    e.stopPropagation();

    // if the array is only 1 length, just return
    if (t.length === 1) {
      return;
    }

    // delete tab and set new tab if the current tab was the deleted one
    dispatch(actions.deleteTab(tabId));
  };
  return (
    <div
      style={{
        height: "fit-content",
        borderRadius: 10,
        backgroundColor: "white",
        maxWidth: "100%",
      }}
    >
      <div className="tab-row">
        {t.map((tab) => (
          <TabLabel key={tab.id} id={tab.id} value={tabValue} changeTab={handleTabChange} copyTab={copyTab} deleteTab={deleteTab} length={length} />
        ))}
        <IconButton onClick={addTab} disabled={t.length >= 10}>
          <Add />
        </IconButton>
      </div>
      <div className="divider"></div>
      {t.map((tab, index) => (
        <HeroTabContent key={tab.key} id={tab.id} value={tabValue} index={index} />
      ))}
    </div>
  );
}

export default HeroTabs;
