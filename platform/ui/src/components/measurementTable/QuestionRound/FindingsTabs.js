import React, { useState, useEffect } from 'react';
import './Stepper.css';

const FindingsTabs = ({ handleChangeReport, total_findings }) => {
  const [findingArray, setfindingArray] = useState([]);
  useEffect(() => {
    for (let i = 1; i <= total_findings; i++) {
      let newValue = 'finding ' + i;
      console.log('new value', newValue);
      setfindingArray(findingArray => [...findingArray, newValue]);
    }
  }, []);
  return (
    <div>
      <ul className="finding-list">
        {findingArray.map((value, index) => {
          return (
            <li id={index} key={index} onClick={handleChangeReport(index + 1)}>
              {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FindingsTabs;
