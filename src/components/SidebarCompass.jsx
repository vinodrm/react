import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { AddBox, People, Category, PlaylistAdd, Settings } from '@mui/icons-material';
import './Sidebar.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const SidebarCompass = () => {
  const [selectedItem, setSelectedItem] = React.useState('');
  const navigate = useNavigate(); // Assign the hook to a constant called navigate

  const handleListItemClick = (item) => {
    setSelectedItem(item);
    if (item === 'Add Entity') {
      navigate('/AddEntityAction'); // Use navigate to navigate to the desired route
    }
  };

  return (
    <Box className="sidebar-container">
      <List sx={{ textAlign: 'left' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', cursor: 'pointer' }}>
        <ListItemText primary="CHANGEBOARD" />
      </Box>
        <ListItemButton selected={selectedItem === 'Add Changeboard'} onClick={() => handleListItemClick('Add Changeboard')}>
          <ListItemIcon>
            <AddBox />
          </ListItemIcon>
          <ListItemText primary="Add Changeboard" />
        </ListItemButton>
      </List>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', cursor: 'pointer' }}>
        <ListItemText primary="Organization" />
      </Box>

      <List sx={{ textAlign: 'left' }}>
        <ListItemButton selected={selectedItem === 'Hotpath'} onClick={() => handleListItemClick('Hotpath')}>
          <ListItemIcon>
            <Category />
          </ListItemIcon>
          <ListItemText primary="Hotpath" />
        </ListItemButton>
      </List>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', cursor: 'pointer' }}>
        <ListItemText primary="Entities" />
      </Box>

      <List sx={{ textAlign: 'left' }}>
        <ListItemButton selected={selectedItem === 'Add Entity'} onClick={() => handleListItemClick('Add Entity')}>
          <ListItemIcon>
            <AddBox />
          </ListItemIcon>
          <ListItemText primary="Add Entity" />
        </ListItemButton>
        <ListItemButton selected={selectedItem === 'Bulk Editor'} onClick={() => handleListItemClick('Bulk Editor')}>
          <ListItemIcon>
            <PlaylistAdd />
          </ListItemIcon>
          <ListItemText primary="Bulk Editor" />
        </ListItemButton>
        <ListItemButton selected={selectedItem === 'Entity View'} onClick={() => handleListItemClick('Entity View')}>
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Entity View" />
        </ListItemButton>
      </List>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', cursor: 'pointer' }}>
        <ListItemText primary="Settings" />
      </Box>

      <List sx={{ textAlign: 'left' }}>
        <ListItemButton selected={selectedItem === 'Data sources'} onClick={() => handleListItemClick('Data sources')}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Data sources" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default SidebarCompass;
