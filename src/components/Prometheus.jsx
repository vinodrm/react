import React from 'react';
import { Box, Typography, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Inventory } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Prometheus = () => {
  const [selectedItem, setSelectedItem] = React.useState('');

  const navigate = useNavigate();

  const handleListItemClick = (item) => {
    setSelectedItem(item);
  };

  const navigateToPage = (path) => {
    navigate(path);
  };

  return (
    <Box>
      <Typography variant="h6">Ingestions</Typography>
      <List>
        <ListItemButton
          selected={selectedItem === 'Prometheus'}
          onClick={() => {
            handleListItemClick('Prometheus');
            navigateToPage('/prometheus');
          }}
        >
          <ListItemIcon>
            <Inventory />
          </ListItemIcon>
          <ListItemText primary="Prometheus Ingestion" />
        </ListItemButton>
        <ListItemButton
          selected={selectedItem === 'InfluxDB'}
          onClick={() => {
            handleListItemClick('InfluxDB');
            navigateToPage('/influxdb');
          }}
        >
          <ListItemIcon>
            <Inventory />
          </ListItemIcon>
          <ListItemText primary="InfluxDB Ingestion" />
        </ListItemButton>
        <ListItemButton
          selected={selectedItem === 'GCP'}
          onClick={() => {
            handleListItemClick('GCP');
            navigateToPage('/gcp');
          }}
        >
          <ListItemIcon>
            <Inventory />
          </ListItemIcon>
          <ListItemText primary="GCP Ingestion" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Prometheus;
