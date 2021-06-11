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

export { calculateFrequency };
