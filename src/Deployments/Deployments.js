import React, { useEffect, useState } from 'react'
function Deployments() {
  /*
  const [date, setDate] = useState('')
  const handleChange = (e) => {
    const { value } = e.target
    setDate(value)
  }
        value={date}
        onChange={handleChange}
  */

  return (
    <div className="deployment-container">
      <div>Deployments</div>
      <label htmlFor="deployment-date">Deployment Date</label>
      <input id="deployment-date"></input>
      <label htmlFor="deployment-time">Deployment Time</label>
      <input id="deployment-time" type="time"></input>
      <button>Add Deployment</button>
    </div>
  )
}

export default Deployments
