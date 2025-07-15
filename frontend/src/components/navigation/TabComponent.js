import React, { useState } from "react";
import {
  Tabs,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HeroTabContent from "./HeroTabContent.js"

// redux import
import { useSelector, useDispatch } from 'react-redux';
import { addTab, changeTab, deleteTab, resetTab } from '../../rtk/tabsSlice.js';
import { copyTabWithHero } from "../../rtk/thunk.js";


const TabComponent = () => {
  const dispatch = useDispatch();
  const currentTab = useSelector(state => state.tabs.currentTab || 0)
  const tabList = useSelector(state => state.tabs.tabList || {});
  const length = useSelector(state => state.tabs.length || 1);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [activeTabIdForMenu, setActiveTabIdForMenu] = useState(null);

  const handleAddTab = () => {
    dispatch(addTab())
  };

  const handleCopy = (id) => {
    dispatch(copyTabWithHero({id, length}));
    handleMenuClose();
  };

  const handleDelete = (e, tabId) => {
    console.log(e)
    e.stopPropagation();

    // if the array is only 1 length, just clear the tab
    if (tabList.length === 1) {
      document.activeElement.blur(); // removes focus
      handleMenuClose();
      dispatch(resetTab(tabId));
      return;
    }

    // delete tab and set new tab if the current tab was the deleted one
    document.activeElement.blur(); // removes focus
    handleMenuClose();
    dispatch(deleteTab(tabId));
  };

  const handleMenuOpen = (event, tabId) => {
    event.stopPropagation();
    setActiveTabIdForMenu(tabId);
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setActiveTabIdForMenu(null);
  };

  return (
    <div className="hero-content-wrapper">
      <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex" }}>
        {tabList.map((tab) => (
          <Box
            key={tab.id}
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 1,
              mr: 1,
              backgroundColor: "white",
              color: currentTab === tab.id ? "black" : "gray",
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              cursor: "pointer",
              fontWeight: currentTab === tab.id ? "bold" : "normal",
              boxShadow: currentTab === tab.id ? 2 : 0,
            }}
            onClick={() => dispatch(changeTab(tab.id))}
          >
            {tab.label}
            <IconButton
              size="small"
              sx={{ ml: 1 }}
              onClick={(e) => handleMenuOpen(e, tab.id)}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}

        <Tooltip title="Add Tab">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 1,
              backgroundColor: "white",
              color: "gray",
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              cursor: "pointer",
            }}
            onClick={handleAddTab}
          >
            <AddIcon />
          </Box>
        </Tooltip>

        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() =>
              handleCopy(tabList.find((tab) => tab.id === activeTabIdForMenu).id)
            }
          >
            Copy Tab
          </MenuItem>
          <MenuItem onClick={(e) => handleDelete(e, activeTabIdForMenu)}>
            Delete Tab
          </MenuItem>
        </Menu>
      </Box>
      {/* Tab Content Area */}
      <div
        style={{
          height: "95%",
          borderRadius: 10,
          backgroundColor: "white",
        }}
      ><Box sx={{ p: 2 }}>
          {tabList.map((tab) => (
            <Box
              key={tab.id}
              hidden={tab.id !== currentTab}
              sx={{ display: tab.id === currentTab ? "block" : "none" }}
            >
              <HeroTabContent id={tab.id} />
            </Box>
          ))}
        </Box>

      </div>
    </div>
  );
};

export default TabComponent;