import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabPanel value={value} index={0}>
        Blessings
      </TabPanel>
      <TabPanel value={value} index={1}>
        Skill Rarity and Banners coming soon
      </TabPanel>
      <TabPanel value={value} index={2}>
        Recommended builds coming soon
      </TabPanel>
      <TabPanel value={value} index={3}>
        Allies coming soon
      </TabPanel>
      <Box sx={{ borderTop: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="tabs-container"
        >
          <Tab label="Resplendant and Blessings" {...a11yProps(0)} wrapped />
          <Tab
            label="Skill Rarity and Appearances"
            {...a11yProps(1)}
            wrapped
            disabled
          />
          <Tab label="Recommended Builds" {...a11yProps(2)} wrapped disabled />
          <Tab label="Allies and Lore" {...a11yProps(3)} wrapped disabled />
        </Tabs>
      </Box>
    </Box>
  );
}
