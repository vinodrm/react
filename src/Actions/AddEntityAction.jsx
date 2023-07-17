import React, { useState } from 'react';

const AddEntityAction = () => {
  const [entityDetails, setEntityDetails] = useState({
    name: '',
    namespace: '',
    type: '',
    team: '',
    tier: '',
    complaint: false,
    workspace: '',
    kpisDefined: '',
    tags: '',
    dataSource: ''
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const updatedValue = type === 'checkbox' ? checked : value;
    setEntityDetails((prevDetails) => ({ ...prevDetails, [name]: updatedValue }));
  };

  const handleSave = () => {
    const jsonData = JSON.stringify(entityDetails);

    // Send jsonData to MongoDB or perform further actions

    // Clear the form fields
    setEntityDetails({
      name: '',
      namespace: '',
      type: '',
      team: '',
      tier: '',
      complaint: false,
      workspace: '',
      kpisDefined: '',
      tags: '',
      dataSource: ''
    });
  };

  return (
    <div>
      <h2>Add Entity</h2>
      <button>BACK</button>
      <input
        type="text"
        name="name"
        placeholder="Untitled Entity"
        value={entityDetails.name}
        onChange={handleInputChange}
      />
      <div>
        <h3>Relationship</h3>
        <input
          type="text"
          name="relationship"
          value={entityDetails.relationship}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <h3>SLOs</h3>
        <input
          type="text"
          name="slos"
          value={entityDetails.slos}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <h3>Health</h3>
        <input
          type="text"
          name="health"
          value={entityDetails.health}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <h3>Alert Rules</h3>
        <input
          type="text"
          name="alertRules"
          value={entityDetails.alertRules}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <h3>0</h3>
        <input
          type="text"
          name="zero"
          placeholder="Click to add name"
          value={entityDetails.zero}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <h3>LAST 14 DAYS</h3>
        <input
          type="text"
          name="last14Days"
          value={entityDetails.last14Days}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <h3>HOURS</h3>
        <input
          type="text"
          name="hours"
          value={entityDetails.hours}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <h3>KPIs</h3>
        <div>
          <h4>KPI</h4>
          <p>No KPIs defined.</p>
        </div>
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default AddEntityAction;
