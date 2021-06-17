const calculateMTTR = (hash) => {
  const mttrArr = [];
  if (Object.keys(hash).length === 0) return '';
  for (let key in hash) {
    mttrArr.push(average(hash[key]));
  }
  const result = average(mttrArr);
  return result;
};

const createNewMeanHash = (meanHash, date, duration) => {
  let newHash = meanHash;
  if (meanHash[date]) {
    newHash[date].push(duration);
  } else {
    newHash[date] = [duration];
  }
  return newHash;
};

const average = (arr) => {
  return arr.reduce((a, b) => parseInt(a) + parseInt(b)) / arr.length;
};

const addRecovery = (recovery) => {
  const recpayload = "{\"recoverydate\": \"" + recovery[0] + "\", \"recoveryduration\": " + recovery[1] + " }"
  console.log("calling addrecovery with " + recpayload)
   fetch("http://localhost:8080/addrecovery", {
     method: "post",
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },

     body: recpayload
   })
}

const clearRecoveries = () => {
  console.log("clearing recoveries from server");
  fetch("http://localhost:8080/clearrecoveries");
}

export { calculateMTTR, createNewMeanHash, addRecovery, clearRecoveries};

