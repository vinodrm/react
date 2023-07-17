import React, { useState } from "react";
import jio from "./jio.svg";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Select,
  MenuItem,
  InputLabel,
  Drawer,
  IconButton,
} from "@mui/material";
import { Error, Explore, Inventory, Logout, Menu } from "@mui/icons-material";
import logo from "./grafana-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("Prometheus");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleListItemClick = (item) => {
    setSelectedItem(item);
    if (item === "Compass") {
      navigate("/Compass");
    } else if (item === "AlertStudio") {
      navigate("/AlertStudio");
    } else if (item === "Prometheus") {
      navigate("/Prometheus");
    } else if (item === "Grafana") {
      navigate("/Grafana");
    } else if (item === "Logout") {
      handleLogoutClick();
    } else {
      // Handle navigation for other items if needed
    }
  };

  const handleLogoutClick = () => {
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box>
      <IconButton
        color="inherit"
        edge="start"
        onClick={toggleSidebar}
        sx={{ display: { md: "none" } }}
      >
        <Menu />
      </IconButton>
      <Drawer
      variant="permanent"
      open={isSidebarOpen}
      onClose={toggleSidebar}
      sx={{
        display: { xs: "none", md: "block" },
        "& .MuiDrawer-paper": { width: 240 },
        // Update the following styles to position the sidebar on the left
        "& .MuiDrawer-paperAnchorLeft": {
          left: "10",
          right: "auto",
        },
      }}
    >
      {sidebarContent()}
    </Drawer>
    </Box>
  );

  function sidebarContent() {
    return (
      <Box className="sidebar-container">
        <header>
          <img
            src={jio}
            className="jio-logo"
            alt="jio"
            style={{
              width: "50px",
              height: "auto",
              position: "absolute",
              top: "10px",
              left: "10px",
            }}
          />
        </header>
        <Box
          sx={{height: "10px", top: "10px", right:"10px"}}
          style={{ paddingTop: "40px" }}
        >
          <Box sx={{ mb: 1, height: "70px" }}>
            <InputLabel id="monitoring-select-label">Organization</InputLabel>
            <Select
              labelId="monitoring-select-label"
              id="monitoring-select"
              value="Prometheus"
              sx={{ width: "30%", fontSize: "0.9rem", height: "35px" }}
            >
              <MenuItem value="JioAds">JioAds</MenuItem>
              <MenuItem value="SSAI">SSAI</MenuItem>
              <MenuItem value="DSP">DSP</MenuItem>
            </Select>
          </Box>

          <List sx={{ textAlign: "left", flexGrow: 1 }}>
            <ListItemButton
              selected={selectedItem === "Prometheus"}
              onClick={() => handleListItemClick("Prometheus")}
            >
              <ListItemIcon>
                <Inventory />
              </ListItemIcon>
              <ListItemText primary="Prometheus" />
            </ListItemButton>
            
            <ListItemButton
              selected={selectedItem === "Compass"}
              onClick={() => handleListItemClick("Compass")}
            >
              <ListItemIcon>
                <Explore />
              </ListItemIcon>
              <ListItemText primary="Compass" />
            </ListItemButton>
            
            <ListItemButton
              selected={selectedItem === "AlertStudio"}
              onClick={() => handleListItemClick("AlertStudio")}
            >
              <ListItemIcon>
                <Error />
              </ListItemIcon>
              <ListItemText primary="AlertStudio" />
            </ListItemButton>
            <ListItemButton
              selected={selectedItem === "Grafana"}
              onClick={() => handleListItemClick("Grafana")}
            >
              <ListItemIcon>
                <img src={logo} alt="Grafana" size="sm" />
              </ListItemIcon>
              <ListItemText primary="Grafana" />
            </ListItemButton>
          </List>

          <Box sx={{ mb: 35 }}>
            <List sx={{ textAlign: "left" }}>{/* Add more list items here if needed */}</List>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center",}}>
            <ListItemButton onClick={handleLogoutClick}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </Box>
        </Box>
      </Box>
    );
  }
};

export default Sidebar;