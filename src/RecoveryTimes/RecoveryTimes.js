import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { calculateMTTR } from './utils';
import { round } from '../ChangeFailRate/utis';

function RecoveryTimes({ setNumberOfRecoveries }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [list, setList] = useState(() => {
    return localStorage.getItem('recoveryTimesList')
      ? JSON.parse(localStorage.getItem('recoveryTimesList'))
      : [];
  });
  const [meanHash, setMeanHash] = useState(
    JSON.parse(localStorage.getItem('meanHash')) || {}
  );
  const [renderMTTR, setRenderMTTR] = useState(
    localStorage.getItem('renderMTTR') || ''
  );

  useEffect(() => {
    localStorage.setItem('recoveryTimesList', JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    if (list.length === 0) {
      setRenderMTTR('');
      return;
    }
    const rawMTTR = calculateMTTR(meanHash);
    let mttr;
    if (rawMTTR === 1) {
      mttr = ` 1 minute`;
    } else {
      mttr = ` ${round(rawMTTR, 1)} minutes`;
    }
    setRenderMTTR(mttr);
  }, [meanHash]);

  useEffect(() => {
    localStorage.setItem('meanHash', JSON.stringify(meanHash));
  }, [meanHash]);

  useEffect(() => {
    localStorage.setItem('renderMTTR', renderMTTR);
  }, [renderMTTR]);

  useEffect(() => {
    setNumberOfRecoveries(list.length);
  }, [list]);

  const handleDateChange = (e) => {
    const { value } = e.target;
    setDate(value);
  };
  const handleTimeChange = (e) => {
    const { value } = e.target;
    setTime(value);
  };

  const handleDurationChange = (e) => {
    const { value } = e.target;
    if (isNaN(value)) return;
    if (value === '0' && duration === '') return;
    setDuration(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (time.length === 0 || date.length === 0 || duration.length === 0) return;
    const newRecoveryTime = [
      format(new Date(`${date} ${time}`), 'M/d/y h:mm:ss a'),
      duration,
    ];
    let newHash = meanHash;
    if (meanHash[date]) {
      newHash[date].push(duration);
    } else {
      newHash[date] = [duration];
    }
    setMeanHash((prevHash) => {
      return { ...prevHash, ...newHash };
    });
    setList((prevList) => {
      return [...prevList, newRecoveryTime];
    });
    setTime('');
    setDate('');
    setDuration('');
  };

  return (
    <div className="container">
      <div className="title">Recovery Times</div>
      <div className="mttr">
        MTTR:
        <span className="render_mttr">{renderMTTR}</span>
      </div>
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
          <input
            id="duration"
            value={duration}
            onChange={handleDurationChange}
            required
          ></input>
          <button type="submit">Add Recovery Time</button>
        </div>
      </form>
    </div>
  );
}

export default RecoveryTimes;
