import React from 'react';
function ChangeFailRate({ renderFailRate }) {
  let failRate;
  if (renderFailRate) {
    failRate = renderFailRate;
  } else {
    failRate = 0;
  }
  return (
    <div className="container change_fail_container">
      <div className="title">Change Fail Rate</div>
      <div className="fail_rate">
        <span>Change Fail Rate:</span>
        <span className="fail_number">{` ${failRate}%`}</span>
      </div>
    </div>
  );
}

export default ChangeFailRate;
