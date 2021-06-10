import React, { useState } from 'react'
import Deployments from './Deployments/Deployments'
import LeadTimes from './LeadTimes/LeadTimes'
import RecoveryTimes from './RecoveryTimes/RecoveryTimes'
import ChangeFailRate from './ChangeFailRate/ChangeFailRate'
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="app_title">Software Delivery Performance Metrics</div>
      <div className="app_container">
        <div className="componentLayout">
          <Deployments />
          <LeadTimes />
        </div>
        <div className="componentLayout">
          <RecoveryTimes />
          <ChangeFailRate />
        </div>
      </div>
    </div>
  )
}

export default App
