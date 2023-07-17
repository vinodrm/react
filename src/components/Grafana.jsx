import React from 'react';
import logo from './grafana-svgrepo-com.svg';
import './Grafana.css';

const Grafana = () => {
  return (
    <div className="Grafana">
      <header className="Grafana-header">
        <img src={logo} className="Grafana-logo" alt="logo" />
        <p>
          Production <code>GCP</code> Monitoring.
        </p>
        <a
          className="Grafana-link"
          href="http://34.131.228.2:17197/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to Grafana
        </a>
      </header>
    </div>
  );
};

export default Grafana;
