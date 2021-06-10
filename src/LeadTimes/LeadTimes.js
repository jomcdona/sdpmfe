import React, { useState, useEffect } from 'react'

const LeadTimes = () => {
  const [minutes, setMinutes] = useState('')
  const [renderMinutes, setRenderMinutes] = useState(localStorage.getItem('renderMinutes') || '')

  useEffect(() => {
    localStorage.setItem('renderMinutes', renderMinutes)
  }, [renderMinutes])

  const handleMinuteChange = (e) => {
    const { value } = e.target
    if (isNaN(value)) return
    if (minutes == 0 && value == 0) return
    setMinutes(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (minutes.length === 0) return
    let msg = ''
    if (minutes === '1') {
      msg = minutes + ' minute'
    } else {
      msg = minutes + ' minutes'
    }
    setRenderMinutes(msg)
    setMinutes('')
  }

  return (
    <div className="container">
      <div className="title">Lead Time</div>
      <div className="time-display">
        From code pushed to code deployed: <b>{renderMinutes}</b>
      </div>
      <label htmlFor="leadTime">Change Lead Time (in minutes)</label>
      <input id="leadTime" name="leadTime" value={minutes} onChange={handleMinuteChange}></input>
      <button onClick={handleSubmit}>Update Lead Time</button>
    </div>
  )
}

export default LeadTimes
