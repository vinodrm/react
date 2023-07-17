import React from 'react';
import { Box, ListItemIcon, ListItemText } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import './Sidebar.css'; // Import the CSS file

const SidebarAlertStudio = () => {
  const handleAlertStreamClick = () => {
    // Logic for handling the click on the Alert Stream button
    console.log('Alert Stream clicked');
  };

  return (
    <Box className="sidebar-container">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', cursor: 'pointer' }} onClick={handleAlertStreamClick}>
        <ListItemIcon>
          <Notifications />
        </ListItemIcon>
        <ListItemText primary="Alert Stream" />
        <ListItemText primary="Rules Catalog" />
      </Box>
    </Box>
  );
};

export default SidebarAlertStudio;
