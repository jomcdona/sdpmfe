import React, { useEffect, useState } from 'react'
function Deployments() {
  const [date, setDate] = useState('')
  const handleChange = (e) => {
    //console.log(e.target.value)
    const { value } = e.target
    setDate(value)
  }

  return (
    <div className="deployment-container">
      <div>Deployments</div>
      <label htmlFor="deployment-date">Deployment Date</label>
      <input
        id="deployment-date"
        type="date"
        value={date}
        onChange={handleChange}
        placeholder="Select"
      ></input>
      <label htmlFor="deployment-time">Deployment Time</label>
      <input id="deployment-time" type="time" step="1"></input>
      <button>Add Deployment</button>
    </div>
  )
}

export default Deployments
