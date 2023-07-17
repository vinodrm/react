import React from 'react';

const ErrorLogs = ({ project }) => {
  // Sample error logs data (replace this with actual data based on your use case)
  const errorLogs = [
    { timestamp: Date.now() - 5000, message: 'Error 1 occurred' },
    { timestamp: Date.now() - 10000, message: 'Error 2 occurred' },
    { timestamp: Date.now() - 15000, message: 'Error 3 occurred' },
    // Add more error logs here...
  ];

  return (
    <div>
      <h3>Error Logs</h3>
      <ul>
        {errorLogs.map((log, index) => (
          <li key={index}>{new Date(log.timestamp).toLocaleString()}: {log.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorLogs;
