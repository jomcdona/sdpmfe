import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { addDeployment, calculateFrequency, clearDeployments, getDeployments } from './utils';

const Deployments = ({ setNumberOfDeployments }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [list, setList] = useState(() => {
    return localStorage.getItem('deploymentsList')
      ? JSON.parse(localStorage.getItem('deploymentsList'))
      : [];
  });
  const [weekFrequency, setWeekFrequency] = useState(
    JSON.parse(localStorage.getItem('frequencyArray')) || []
  );
  const [renderWeekFrequency, setRenderWeekFrequency] = useState(
    localStorage.getItem('renderFrequency') || ''
  );

  useEffect(() => {
    const tempFreq = calculateFrequency(weekFrequency);
    if (!tempFreq || list.length === 0) return;
    const renderFreq = ` ${tempFreq}/week`;
    localStorage.setItem('renderFrequency', renderFreq);
    setRenderWeekFrequency(renderFreq);
  }, [weekFrequency, list]);

  useEffect(() => {
    localStorage.setItem('deploymentsList', JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    setNumberOfDeployments(list.length);
  }, [list, setNumberOfDeployments]);

  useEffect(() => {
    localStorage.setItem('frequencyArray', JSON.stringify(weekFrequency));
  }, [weekFrequency]);

  const handleDateChange = (e) => {
    const { value } = e.target;
    setDate(value);
  };
  const handleTimeChange = (e) => {
    const { value } = e.target;
    setTime(value);
  };

  const getDeployLocal = async () => {
    let jsonData = await getDeployments();
    console.log("here: " + JSON.stringify(jsonData));
    localStorage.setItem('deploymentsList', JSON.stringify(jsonData))
    setList(jsonData);

   }

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

    const persistDeployment = format(
      new Date(`${date} ${time}`),
      'yyyy-MM-dd hh:mm:ss a'
    );

    addDeployment(persistDeployment);
    getDeployLocal();
    //console.log("this is what i got back from function call " + djson);
    //setList(JSON.parse(localStorage.getItem('deploymentsList')))
    let miliTime = new Date(date).getTime();
    setWeekFrequency((prevFrequency) => {
      return [...prevFrequency, miliTime];
    });
    setTime('');
    setDate('');
  };

  const handleClear = (e) => {
    localStorage.clear();
    localStorage.setItem('deploymentsList', '');
    localStorage.setItem('renderFrequency', '');
    setList([]);
    setRenderWeekFrequency('');
    clearDeployments();
  }
  

  return (

    <div className="container">
      <div className="title">Deployments</div>
      <div className="frequency">
        Frequency:
        <b>{renderWeekFrequency}</b>
      </div>
      <ol>
        {list.map((item) => {
          return <li key={item.id}>{item.Date} {item.Time}</li>;
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
      <div><button onClick={handleSubmit}>Add Deployment</button></div>
      <div><button onClick={handleClear}>Clear Deployments</button></div>
    </div>
  );
};

export default Deployments;
