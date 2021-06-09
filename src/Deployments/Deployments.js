import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

function Deployments() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [list, setList] = useState([]);
  const handleDateChange = (e) => {
    const { value } = e.target;
    setDate(value);
  };
  const handleTimeChange = (e) => {
    const { value } = e.target;
    setTime(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (time.length === 0 || date.length === 0) return;
    const newDeployment = format(
      new Date(`${date} ${time}`),
      'M/d/y h:mm:ss a'
    );
    setList((prevList) => {
      return [...prevList, newDeployment];
    });
    setTime('');
    setDate('');
  };

  return (
    <div className="container">
      <div className="title">Deployments</div>
      <ol>
        {list.map((item, index) => {
          return <li key={index}>{item}</li>;
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
  );
}

export default Deployments;
