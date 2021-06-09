import Deployments from './Deployments/Deployments'
import RecoveryTimes from './RecoveryTimes/RecoveryTimes'
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="componentLayout">
        <Deployments />
        <RecoveryTimes />
      </div>
    </div>
  )
}

export default App
