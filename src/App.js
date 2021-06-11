import React, { useEffect, useState } from 'react';
import Deployments from './Deployments/Deployments';
import LeadTimes from './LeadTimes/LeadTimes';
import RecoveryTimes from './RecoveryTimes/RecoveryTimes';
import ChangeFailRate from './ChangeFailRate/ChangeFailRate';
import { round } from './ChangeFailRate/utis';
import './App.css';

const App = () => {
  const [numberOfDeployments, setNumberOfDeployments] = useState(0);
  const [numberOfRecoveries, setNumberOfRecoveries] = useState(0);
  const [renderFailRate, setRenderFailRate] = useState(
    localStorage.getItem('failRate') || ''
  );

  useEffect(() => {
    if (numberOfDeployments !== 0 && numberOfRecoveries !== 0) {
      const rawFailRate = numberOfRecoveries / numberOfDeployments;
      const roundedFailRate = round(rawFailRate, 1);
      setRenderFailRate(roundedFailRate);
    }
  }, [numberOfDeployments, numberOfRecoveries]);

  useEffect(() => {
    localStorage.setItem('failRate', renderFailRate);
  }, [renderFailRate]);

  return (
    <div className="App">
      <div className="app_title">Software Delivery Performance Metrics</div>
      <div className="app_container">
        <div className="componentLayout">
          <Deployments setNumberOfDeployments={setNumberOfDeployments} />
          <LeadTimes />
        </div>
        <div className="componentLayout">
          <RecoveryTimes setNumberOfRecoveries={setNumberOfRecoveries} />
          <ChangeFailRate renderFailRate={renderFailRate} />
        </div>
      </div>
    </div>
  );
};

export default App;
