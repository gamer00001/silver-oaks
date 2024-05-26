import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import clsx from "clsx";

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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function TabsComponent({ tabs }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          classes={{
            indicator: "bg-[#7A1315]", // Custom color for the indicator (tab line)
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              label={tab.label}
              key={index}
              className={clsx(
                "text-[#7A1315]",
                "hover:text-[#7A1315]", // Custom hover color
                value === index && "text-[#7A1315]",
                "text-xl"
              )} //
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <TabPanel value={value} index={index} key={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
}

export default TabsComponent;
