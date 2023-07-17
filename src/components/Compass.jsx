import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import SidebarCompass from './SidebarCompass';
import { CheckCircle, Warning, Error } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const CompassContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.background.paper,
}));

const StateTimeline = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: 'numeric',
        minute: '2-digit',
      });
      setCurrentTime(currentTime);
    }, 300000); // Update every 5 minutes (300,000 milliseconds)

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const theme = useTheme();
  const entityHealth = {
    '00:00': 'OK',
    '00:05': 'Critical',
    '00:10': 'Warning',
    '00:15': 'OK',
    '00:20': 'Critical',
    '00:25': 'Warning',
    '00:30': 'OK',
    '00:35': 'Critical',
    '00:40': 'Warning',
    '00:45': 'OK',
    '00:50': 'Critical',
    '00:55': 'Warning',
    // Add more time series data and entity health as needed
  };

  const timeSeriesData = [
    '00:00', '00:05', '00:10', '00:15', '00:20', '00:25',
    '00:30', '00:35', '00:40', '00:45', '00:50', '00:55',
    // Add more time series data as needed
  ];

  const entityName = 'Impression Box'; // Entity name

  return (
    <div className="state-timeline">
      <div className="expanded-view">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              {timeSeriesData.map((time) => (
                <th key={time}>{time}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{entityName}</td>
              {timeSeriesData.map((time) => (
                <td key={time}>
                  <div className="dot-container">
                    {entityHealth[time] === 'OK' && (
                      <CheckCircle className="dot ok" style={{ color: theme.palette.success.light }} />
                    )}
                    {entityHealth[time] === 'Critical' && (
                      <Error className="dot critical" style={{ color: theme.palette.error.main }} />
                    )}
                    {entityHealth[time] === 'Warning' && (
                      <Warning className="dot warning" style={{ color: theme.palette.warning.light }} />
                    )}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Compass = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigateToPage = (path) => {
    navigate(path);
  };

  return (
    <div className="compass-container">
      <Grid container justifyContent="center" spacing={0}>
        <Grid item xs={2} sm={2} textAlign="left">
          <SidebarCompass />
        </Grid>
        <Grid item xs={10} sm={9} textAlign="left">
          <CompassContainer>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="Compass Tabs"
            >
              <Tab label="All Entities" onClick={() => navigateToPage('/compass')} />
              <Tab label="Threat+Breach" onClick={() => navigateToPage('/compass/threat-breach')} />
              <Tab label="Breached" onClick={() => navigateToPage('/compass/breached')} />
              <Tab label="Under Threat" onClick={() => navigateToPage('/compass/under-threat')} />
            </Tabs>
            {value === 0 && (
              <div>
                <StateTimeline />
              </div>
            )}
            {value === 1 && <div>Threat+Breach Content</div>}
            {value === 2 && <div>Breached Content</div>}
            {value === 3 && <div>Under Threat Content</div>}
          </CompassContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Compass;
