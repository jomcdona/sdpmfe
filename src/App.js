import Deployments from './Deployments/Deployments'
import LeadTimes from './LeadTimes/LeadTimes'
import RecoveryTimes from './RecoveryTimes/RecoveryTimes'
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="componentLayout">
        <Deployments />
        <RecoveryTimes />
      </div>
      <LeadTimes />
    </div>
  )
}

export default App
