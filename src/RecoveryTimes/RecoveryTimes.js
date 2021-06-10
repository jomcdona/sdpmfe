import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'

function RecoveryTimes() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [duration, setDuration] = useState('')
  const [list, setList] = useState(() => {
    return localStorage.getItem('recoveryTimesList')
      ? JSON.parse(localStorage.getItem('recoveryTimesList'))
      : []
  })

  useEffect(() => {
    localStorage.setItem('recoveryTimesList', JSON.stringify(list))
  }, [list])

  const handleDateChange = (e) => {
    const { value } = e.target
    setDate(value)
  }
  const handleTimeChange = (e) => {
    const { value } = e.target
    setTime(value)
  }

  const handleDurationChange = (e) => {
    const { value } = e.target
    if (isNaN(value)) return
    if (value === '0' && duration === '') return
    setDuration(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (time.length === 0 || date.length === 0 || duration.length === 0) return
    const newRecoveryTime = [format(new Date(`${date} ${time}`), 'M/d/y h:mm:ss a'), duration]
    setList((prevList) => {
      return [...prevList, newRecoveryTime]
    })
    setTime('')
    setDate('')
    setDuration('')
  }

  return (
    <div className="container">
      <div className="title">Recovery Times</div>
      <table>
        <thead>
          <tr>
            <th>Start Time</th>
            <th>Duration (minutes)</th>
          </tr>
        </thead>
        <tbody>
          {list.map((recoveryTime, key) => (
            <tr key={key}>
              <td>{recoveryTime[0]}</td>
              <td>{recoveryTime[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <div className="recoveryTimesStartInputs">
            <label htmlFor="start-date">Start Date</label>
            <input
              id="start-date"
              name="start-date"
              type="date"
              value={date}
              onChange={handleDateChange}
              required
            ></input>
          </div>
          <div className="recoveryTimesStartInputs">
            <label htmlFor="start-time">Start Time</label>
            <input
              id="start-time"
              type="time"
              value={time}
              onChange={handleTimeChange}
              required
            ></input>
          </div>
        </div>
        <div className="recoveryTimesStartInputs">
          <label htmlFor="duration">Duration</label>
          <input id="duration" value={duration} onChange={handleDurationChange} required></input>
          <button type="submit">Add Recovery Time</button>
        </div>
      </form>
    </div>
  )
}

export default RecoveryTimes
