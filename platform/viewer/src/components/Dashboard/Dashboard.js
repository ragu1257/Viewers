import React from 'react';
import { withRouter, Redirect, useHistory } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const history = useHistory();
  const routeChange = () => {
    let path = `/viewer/1.3.6.1.4.1.18047.1.11.11616749948975`;
    history.push(path);
  };
  return (
    <div className="intro">
      <div className="black"></div>
      <div className="white"></div>
      <div className="boxfather">
        <div className="box">
          <h1>WELCOME</h1>
          <button onClick={routeChange}>Continue with studies...</button>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Dashboard);
