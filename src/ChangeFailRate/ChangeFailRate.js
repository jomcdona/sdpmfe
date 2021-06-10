import React, { useEffect, useState } from 'react'

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}

function ChangeFailRate() {
  const [changeFailRate, setChangeFailRate] = useState(0)

  useEffect(() => {
    const recList =
      localStorage.getItem('recoveryTimesList') &&
      JSON.parse(localStorage.getItem('recoveryTimesList'))
    const depList =
      localStorage.getItem('deploymentsList') && JSON.parse(localStorage.getItem('deploymentsList'))
    if (depList && recList) {
      const temp = recList.length / depList.length
      setChangeFailRate(round(temp, 1))
    }
  }, [])
  return (
    <div className="container change_fail_container">
      <div className="title">Change Fail Rate</div>
      <div className="fail_rate">
        <span>Change Fail Rate:</span>
        <span className="fail_number">{` ${changeFailRate}%`}</span>
      </div>
    </div>
  )
}

export default ChangeFailRate
