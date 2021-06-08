import React, { useEffect, useState } from 'react'
function Deployments() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [list, setList] = useState([])
  const handleDateChange = (e) => {
    const { value } = e.target
    setDate(value)
  }
  const handleTimeChange = (e) => {
    const { value } = e.target
    setTime(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (time.length === 0 || date.length === 0) return
    let newDate = date.split('-')
    if (newDate[1] < 10) {
      newDate[1] = newDate[1][1]
    }
    newDate = `${newDate[1]}/${newDate[2]}/${newDate[0]}`
    let newTime = time.split(':')
    let ampm
    if (newTime[0] > 12) {
      newTime[0] = newTime[0] - 12
      ampm = ' PM'
    } else {
      newTime[0] = `${newTime[0][1]}`
      ampm = ' AM'
    }
    const newDeployment = `${newDate} ${newTime.join(':')}:00${ampm}`
    setList((prevList) => {
      return [...prevList, newDeployment]
    })
    setTime('')
    setDate('')
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '400px',
        backgroundColor: '#f3f3f3',
        padding: '10px',
      }}
      className="deployment-container"
    >
      <div>Deployments</div>
      <ol>
        {list.map((item, index) => {
          return <li key={index}>{item}</li>
        })}
      </ol>
      <label style={{ display: 'block' }} htmlFor="deployment-date">
        Deployment Date
      </label>
      <input
        id="deployment-date"
        name="deployment-date"
        type="date"
        value={date}
        onChange={handleDateChange}
      ></input>
      <label style={{ display: 'block' }} htmlFor="deployment-time">
        Deployment Time
      </label>
      <input
        id="deployment-time"
        type="time"
        step="1"
        value={time}
        onChange={handleTimeChange}
      ></input>
      <button
        style={{ backgroundColor: '#5487e0', width: '150px', marginTop: '5px', color: 'white' }}
        onClick={handleSubmit}
      >
        Add Deployment
      </button>
    </div>
  )
}

export default Deployments
