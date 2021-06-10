import React, { useEffect, useState } from 'react'
import { format, getWeek } from 'date-fns'

function Deployments() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [list, setList] = useState(() => {
    return localStorage.getItem('deploymentsList')
      ? JSON.parse(localStorage.getItem('deploymentsList'))
      : []
  })
  const [weekFrequency, setWeekFrequency] = useState([])
  const [renderWeekFrequency, setRenderWeekFrequency] = useState('')

  useEffect(() => {
    const deploys = weekFrequency.length
    const min = Math.min(...weekFrequency)
    const max = Math.max(...weekFrequency)
    const delta = max - min
    const days = delta / 86400000
    let weeks
    if (days < 7) {
      weeks = 1
    } else {
      weeks = days / 7
    }
    const a = deploys / weeks
    let tempFreq = (Math.ceil(a * 10) / 10).toFixed(1)
    if (tempFreq === '0.0') {
      return
    } else if (tempFreq % 1 === 0) {
      tempFreq = Math.round(tempFreq)
    }
    const renderFreq = ` ${tempFreq}/week`
    setRenderWeekFrequency(renderFreq)
  }, [weekFrequency])

  useEffect(() => {
    localStorage.setItem('deploymentsList', JSON.stringify(list))
  }, [list])

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
    const newDeployment = format(new Date(`${date} ${time}`), 'M/d/y h:mm:ss a')
    setList((prevList) => {
      return [...prevList, newDeployment]
    })
    let miliTime = new Date(date).getTime()
    setWeekFrequency((prevFrequency) => {
      return [...prevFrequency, miliTime]
    })
    setTime('')
    setDate('')
  }

  return (
    <div className="container">
      <div className="title">Deployments</div>
      <div className="frequency">
        Frequency:
        <b>{renderWeekFrequency}</b>
      </div>
      <ol>
        {list.map((item, index) => {
          return <li key={index}>{item}</li>
        })}
      </ol>
      <label htmlFor="deployment-date">Deployment Date</label>
      <input
        id="deployment-date"
        name="deployment-date"
        type="date"
        value={date}
        onChange={handleDateChange}
      ></input>
      <label htmlFor="deployment-time">Deployment Time</label>
      <input
        id="deployment-time"
        type="time"
        step="1"
        value={time}
        onChange={handleTimeChange}
      ></input>
      <button onClick={handleSubmit}>Add Deployment</button>
    </div>
  )
}

export default Deployments
