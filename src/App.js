import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Grid } from '@mui/material';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Compass from './components/Compass';
import AlertStudio from './components/AlertStudio';
import Prometheus from './components/Prometheus';
import Grafana from './components/Grafana';
import AddEntityAction from './Actions/AddEntityAction';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Compass" element={<Compass />} />
          <Route path="/AlertStudio" element={<AlertStudio />} />
          <Route path="/Prometheus" element={<Prometheus />} />
          <Route path="/Grafana" element={<Grafana />} /> {/* New route for Grafana */}
          <Route path="/AddEntityAction" element={<AddEntityAction />} />
          <Route
            path="/Dashboard"
            element={
              <Grid container justifyContent="center" spacing={0}>
                <Grid item xs={2} sm={2} textAlign="left">
                  <Sidebar />
                </Grid>
                <Grid item xs={10} sm={10} textAlign="left">
                  <Routes>
                    <Route path="/" element={<Feed />} />
                  </Routes>
                </Grid>
              </Grid>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
