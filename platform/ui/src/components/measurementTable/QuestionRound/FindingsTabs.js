import React, { useState, useEffect } from 'react';
import './Stepper.css';
import DoneIcon from '@material-ui/icons/Done';

const FindingsTabs = ({ handleChangeReport, total_findings, findingCount }) => {
  const [findingArray, setfindingArray] = useState([]);
  console.log('thi is finding tabs findingCount', findingCount);
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
          return findingCount && findingCount.includes(value) ? (
            <li id={index} key={index} onClick={handleChangeReport(index + 1)}>
              {value}
              <DoneIcon/>
            </li>
          ) : (
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
