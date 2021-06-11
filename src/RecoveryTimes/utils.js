const calculateMTTR = (hash) => {
  const mttrArr = [];
  if (Object.keys(hash).length === 0) return '';
  for (let key in hash) {
    mttrArr.push(average(hash[key]));
  }
  const result = average(mttrArr);
  return result;
};

const average = (arr) => {
  return arr.reduce((a, b) => parseInt(a) + parseInt(b)) / arr.length;
};

export { calculateMTTR };
