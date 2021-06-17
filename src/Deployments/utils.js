import { round } from '../ChangeFailRate/utis';
import { getWeek, getWeekYear } from 'date-fns';

const calculateFrequency = (weekFrequency) => {
  const deploys = weekFrequency.length;
  const min = Math.min(...weekFrequency);
  const max = Math.max(...weekFrequency);
  let delta = 0;
  if (getWeekYear(min) !== getWeekYear(max)) {
    delta = getWeekYear(max) - getWeekYear(min);
    delta = delta * 52;
  }
  const deltaWeek = Math.abs(getWeek(max) + delta - getWeek(min)) + 1;
  const a = deploys / deltaWeek;
  let tempFreq = round(a, 1);
  if (tempFreq === '0.0' || tempFreq === 0) {
    tempFreq = '< 0.1';
  } else if (tempFreq % 1 === 0) {
    tempFreq = Math.round(tempFreq);
  }
  return tempFreq;
};

const addDeployment = (deployment) =>
{
   console.log("calling addDeployments with " + deployment)
   fetch("http://localhost:8080/adddeployment", {
     method: "post",
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'text/plain'
     },

     body: deployment
   })
}

const clearDeployments = () =>
{
  console.log("clearing persisted deployments")
  fetch("http://localhost:8080/cleardeployments")
}

const getDeployments = async() =>
{
  console.log("retrieving persisted deployments")
  let deploydata = await fetch("http://localhost:8080/getdeployments")
  let deployjson = await deploydata.json()
  console.log(deployjson)
  return deployjson;
  /*.then(responsedata  => responsedata.json())
  .then(responsedata => {
     console.log(responsedata)
     return(responsedata)
  })
  .catch((error) => {
    console.log(error)
  })*/
}
export { calculateFrequency, addDeployment, clearDeployments, getDeployments }
