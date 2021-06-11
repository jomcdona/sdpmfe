import { round } from '../ChangeFailRate/utis';

const calculateFrequency = (weekFrequency) => {
  const deploys = weekFrequency.length;
  const min = Math.min(...weekFrequency);
  const max = Math.max(...weekFrequency);
  const delta = max - min;
  const days = delta / 86400000;
  let weeks;
  if (days < 7) {
    weeks = 1;
  } else {
    weeks = days / 7;
  }
  const a = deploys / weeks;
  let tempFreq = round(a, 1);
  if (tempFreq === '0.0' || tempFreq === 0) {
    tempFreq = '< 0.1';
  } else if (tempFreq % 1 === 0) {
    tempFreq = Math.round(tempFreq);
  }
  return tempFreq;
};

export { calculateFrequency };
