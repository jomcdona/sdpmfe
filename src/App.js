import React, { useState } from 'react';
import Deployments from './Deployments/Deployments';
import LeadTimes from './LeadTimes/LeadTimes';
import RecoveryTimes from './RecoveryTimes/RecoveryTimes';
import ChangeFailRate from './ChangeFailRate/ChangeFailRate';
import './App.css';

const App = () => {
  const [numberOfDeployments, setNumberOfDeployments] = useState(0);

  return (
    <div className="App">
      <div className="app_title">Software Delivery Performance Metrics</div>
      <div className="app_container">
        <div className="componentLayout">
          <Deployments setNumberOfDeployments={setNumberOfDeployments} />
          <LeadTimes />
        </div>
        <div className="componentLayout">
          <RecoveryTimes />
          <ChangeFailRate />
        </div>
      </div>
    </div>
  );
};

export default App;
