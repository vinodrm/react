import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Grid, Select, MenuItem, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ThumbUpSharp, ThumbDownSharp, Warning, Done } from '@mui/icons-material';
import { Pagination } from '@mui/material';
import io from 'socket.io-client';
import Chart from './Chart'; // Import the component for real-time charts
import ErrorLogs from './ErrorLogs'; // Import the component for error logs

const Feed = () => {
  // State variables
  const [activityStream, setActivityStream] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [liveUpdates, setLiveUpdates] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(5);

  // Function to start live updates
  const handleLiveUpdates = () => {
    setLiveUpdates(true);
  };

  // Function to stop live updates
  const handleStopLiveUpdates = () => {
    setLiveUpdates(false);
  };

  // Simulate data for activity stream (Replace this with actual server data)
  const dummyData = [
    { id: 1, type: 'statusChange', project: 'JioAds', status: 'healthy', timestamp: Date.now() },
    { id: 2, type: 'statusChange', project: 'SSAI', status: 'warning', timestamp: Date.now() },
    { id: 3, type: 'statusChange', project: 'DSP', status: 'critical', timestamp: Date.now() },
    // Add more dummy data here...
  ];

  useEffect(() => {
    // Code to fetch real activity stream data from the server or WebSocket connection
    // For simplicity, we will use dummy data here
    setActivityStream(dummyData);
  }, []);

  useEffect(() => {
    if (liveUpdates) {
      const socket = io('http://your-server-url'); // Replace 'http://your-server-url' with your actual WebSocket server URL
      socket.on('activity', (event) => {
        // Update the activityStream state whenever a new event is received
        setActivityStream((prevActivityStream) => [...prevActivityStream, event]);
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [liveUpdates]);

  // Function to handle smart filtering of activity stream
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    // Code to filter activityStream based on the selected filter criteria
    // For simplicity, we will update the state with filtered data
    // Replace this with actual filtering logic based on the selected filter
    setActivityStream(dummyData);
  };

  // Function to handle page change for pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Function to mark an event as acknowledged
  const handleAcknowledge = (eventId) => {
    // Find the event in the activity stream by its ID and mark it as acknowledged
    const updatedActivityStream = activityStream.map((event) =>
      event.id === eventId ? { ...event, acknowledged: true } : event
    );
    setActivityStream(updatedActivityStream);
  };

  // Function to open the project details modal
  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setOpenDetailsModal(true);
  };

  // Function to close the project details modal
  const handleCloseModal = () => {
    setOpenDetailsModal(false);
  };

  // ActivityCard component to display each activity event
  const ActivityCard = ({ event, onAcknowledge, onOpenModal }) => {
    const [acknowledged, setAcknowledged] = useState(event.acknowledged || false);

    const handleAcknowledge = () => {
      setAcknowledged(true);
      onAcknowledge(event.id);
    };

    const handleOpenModal = () => {
      onOpenModal(event);
    };

    const getEventIcon = () => {
      switch (event.type) {
        case 'statusChange':
          return event.status === 'healthy' ? <ThumbUpSharp style={{ color: 'green' }} /> : event.status === 'warning' ? <Warning style={{ color: 'yellow' }} /> : <ThumbDownSharp style={{ color: 'red' }} />;
        default:
          return null;
      }
    };

    return (
      <Paper elevation={3} style={{ padding: '10px', backgroundColor: acknowledged ? '#f0f0f0' : '#ffffff', marginBottom: '10px', transition: 'all 0.2s' }}>
        <Typography variant="subtitle1">
          {getEventIcon()} {event.project}
        </Typography>
        <Typography variant="body2">Event Type: {event.type}</Typography>
        <Typography variant="body2">Timestamp: {new Date(event.timestamp).toLocaleString()}</Typography>
        {!acknowledged && (
          <IconButton onClick={handleAcknowledge} size="small" style={{ position: 'absolute', top: '5px', right: '5px' }}>
            <Done />
          </IconButton>
        )}
        <Button onClick={handleOpenModal} size="small" variant="outlined" color="primary" style={{ marginTop: '10px' }}>
          View Details
        </Button>
      </Paper>
    );
  };

  // Pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = activityStream.slice(indexOfFirstProject, indexOfLastProject);

  // Total counts
  const totalProjects = activityStream.length;
  const totalHealthyProjects = activityStream.filter((project) => project.status === 'healthy').length;
  const totalWarningProjects = activityStream.filter((project) => project.status === 'warning').length;
  const totalCriticalProjects = activityStream.filter((project) => project.status === 'critical').length;

  return (
    <Box>
      <Typography variant="h4">Activity Stream</Typography>

      {/* Live Updates Button */}
      {liveUpdates ? (
        <Button variant="contained" onClick={handleStopLiveUpdates}>
          Stop Live Updates
        </Button>
      ) : (
        <Button variant="contained" onClick={handleLiveUpdates}>
          Start Live Updates
        </Button>
      )}

      {/* Smart Filters */}
      <Select value={selectedFilter} onChange={handleFilterChange}>
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="statusChange">Status Change</MenuItem>
        {/* Add more filter options here */}
      </Select>

      {/* Project Overview */}
      <Box>
        <Typography variant="h6">Project Overview</Typography>
        <Typography variant="body2">Total Projects: {totalProjects}</Typography>
        <Typography variant="body2">Healthy Projects: {totalHealthyProjects}</Typography>
        <Typography variant="body2">Warning Projects: {totalWarningProjects}</Typography>
        <Typography variant="body2">Critical Projects: {totalCriticalProjects}</Typography>
      </Box>

      {/* Activity Stream List */}
      <Grid container spacing={2}>
        {currentProjects.map((event) => (
          <Grid item key={event.id} xs={12} sm={6} md={4}>
            <ActivityCard event={event} onAcknowledge={handleAcknowledge} onOpenModal={handleOpenModal} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Pagination
        count={Math.ceil(activityStream.length / projectsPerPage)}
        page={currentPage}
        onChange={(event, newPage) => handlePageChange(newPage)}
      />

      {/* Project Details Modal */}
      <Dialog open={openDetailsModal} onClose={handleCloseModal}>
        <DialogTitle>{selectedProject && selectedProject.project}</DialogTitle>
        <DialogContent>
          {selectedProject ? (
            <div>
              <Typography variant="body1">Project Details:</Typography>
              <Typography variant="body2">ID: {selectedProject.id}</Typography>
              <Typography variant="body2">Status: {selectedProject.status}</Typography>
              <Typography variant="body2">Timestamp: {new Date(selectedProject.timestamp).toLocaleString()}</Typography>

              {/* Real-Time Chart */}
              <Chart project={selectedProject} />

              {/* Error Logs */}
              <Typography variant="body1" style={{ marginTop: '20px' }}>Error Logs:</Typography>
              <ErrorLogs project={selectedProject} />
            </div>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Feed;
