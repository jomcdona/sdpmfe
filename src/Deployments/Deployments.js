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
  const [weekFrequency, setWeekFrequency] = useState({})
  const [renderWeekFrequency, setRenderWeekFrequency] = useState('')

  useEffect(() => {
    const divisor = Object.keys(weekFrequency).length
    if (divisor < 1) return
    let sum = 0
    for (let key in weekFrequency) {
      sum += weekFrequency[key]
    }
    let average = sum / divisor
    average = average.toFixed(1)
    let tempRenderWeekFrequency
    if (average % 1 !== 0) {
      tempRenderWeekFrequency = ` ${average}/week`
    } else {
      average = Math.round(average)
      tempRenderWeekFrequency = ` ${average}/week`
    }
    setRenderWeekFrequency(tempRenderWeekFrequency)
  }, [list])

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
    const week = getWeek(new Date(date))
    let tempWeekFrequency = weekFrequency
    if (tempWeekFrequency[week]) {
      tempWeekFrequency[week] += 1
    } else {
      tempWeekFrequency[week] = 1
    }
    const newDeployment = format(new Date(`${date} ${time}`), 'M/d/y h:mm:ss a')
    setList((prevList) => {
      return [...prevList, newDeployment]
    })
    setWeekFrequency(tempWeekFrequency)
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
