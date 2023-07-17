import React from 'react';
import SidebarAlertStudio from './SidebarAlertStudio';
import './AlertStudio.css';

const AlertStudio = () => {
  // Example data for services under degradation and services under alert
  const servicesUnderDegradation = ['Service A', 'Service B', 'Service C'];
  const servicesUnderAlert = ['Service X', 'Service Y', 'Service Z'];

  return (
    <div className="alert-studio-container">
      <SidebarAlertStudio />
      <div className="content">
        <h1>Alert Studio</h1>
        <div className="alert-stream">
          <h2>Alert Stream</h2>
          {/* Add your Alert Stream component here */}
        </div>
        <div className="services-under-degradation">
          <h2>Services Under Degradation</h2>
          <ul>
            {servicesUnderDegradation.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
        <div className="services-under-alert">
          <h2>Services Under Alert</h2>
          <ul>
            {servicesUnderAlert.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlertStudio;
