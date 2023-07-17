import React from 'react';
import { Card, CardContent, Typography, makeStyles } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 300,
    margin: 'auto',
    marginTop: theme.spacing(2),
  },
}));

const MonitoringComponent = () => {
  const classes = useStyles();

  // Mock monitoring data
  const monitoringData = {
    application: 'My Web App',
    status: 'Online',
    responseTime: '37 ms',
    errors: 0,
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" component="div">
          Monitoring
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Application: {monitoringData.application}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Status: {monitoringData.status}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Response Time: {monitoringData.responseTime}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Errors: {monitoringData.errors}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MonitoringComponent;
