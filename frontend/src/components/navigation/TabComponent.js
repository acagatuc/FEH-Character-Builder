import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Tabs,
  Tab,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Tooltip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";

const TabComponent = () => {
  const [tabs, setTabs] = useState([
    { id: 0, label: "Tab 1" },
    { id: 1, label: "Tab 2" },
  ]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [activeTabIdForMenu, setActiveTabIdForMenu] = useState(null);

  // Example Redux selector
  const tabImages = useSelector((state) => state.tabImages);
  // Expected: { 0: "url1", 1: "url2" }

  const handleAddTab = () => {
    const newTab = {
      id: Date.now(),
      label: `Tab ${tabs.length + 1}`,
    };
    setTabs([...tabs, newTab]);
    setSelectedTab(newTab.id);
  };

  const handleCopy = (tab) => {
    const newTab = {
      id: Date.now(),
      label: tab.label + " Copy",
    };
    setTabs([...tabs, newTab]);
    setSelectedTab(newTab.id);
    handleMenuClose();
  };

  const handleDelete = (tabId) => {
    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);
    if (selectedTab === tabId && newTabs.length > 0) {
      setSelectedTab(newTabs[0].id);
    }
    handleMenuClose();
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
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={
          selectedTab === "add"
            ? false
            : tabs.findIndex((t) => t.id === selectedTab)
        }
        onChange={(e, newIndex) => {
          if (newIndex === tabs.length) return;
          setSelectedTab(tabs[newIndex].id);
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            sx={{
              backgroundColor: "white",
              color: "gray",
              "&.Mui-selected": {
                backgroundColor: "white",
                color: "black", // optional: make selected tab text darker
                fontWeight: "bold",
              },
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              mr: 1,
            }}
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {tabImages?.[tab.id] && (
                  <Avatar
                    src={tabImages[tab.id]}
                    alt="tab icon"
                    sx={{ width: 24, height: 24 }}
                  />
                )}
                {tab.label}
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpen(e, tab.id)}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Box>
            }
          />
        ))}

        {/* Add Button as a Tab */}
        <Tab
          sx={{
            backgroundColor: "white",
            color: "gray",
            "&.Mui-selected": {
              backgroundColor: "white",
              color: "black", // optional: make selected tab text darker
              fontWeight: "bold",
            },
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            mr: 1,
          }}
          label={
            <Tooltip title="Add Tab">
              <IconButton size="small" onClick={handleAddTab}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          }
          onClick={handleAddTab}
        />
      </Tabs>

      {/* Action Menu */}
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
            handleCopy(tabs.find((tab) => tab.id === activeTabIdForMenu))
          }
        >
          Copy Tab
        </MenuItem>
        <MenuItem onClick={() => handleDelete(activeTabIdForMenu)}>
          Delete Tab
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TabComponent;
