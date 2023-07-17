import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Compass from './Compass';
import Feed from './Feed';

const MainContent = () => {
  const [activeComponent, setActiveComponent] = useState('');

  const handleLaunchCompass = () => {
    setActiveComponent('compass');
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'compass':
        return <Compass />;
      // Add more cases for other components
      default:
        return <Feed launchHandler={handleLaunchCompass} />;
    }
  };

  return (
    <div>
      <Sidebar onCompassClick={handleLaunchCompass} />
      <div>
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default MainContent;
