import React, { useState, useContext } from 'react';
import { AccountContext } from './Account';
import './Loginpage.css'
// import AppContext from './Account';
import { withRouter, Redirect } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '../../UserPool';

const LoginPage = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const { authenticate } = useContext(AccountContext);
  // console.log('account aonctext', AccountContext, user);
  // const onSubmit = e => {
  //   e.preventDefault();
  //   setIsLoggedIn(true)
  //   // authenticate(username, password)
  //   //   .then(data => {
  //   //     console.log('logged in ', data);
  //   //   })
  //   //   .catch(err => {
  //   //     console.error('failed to login: ', err);
  //   //   });
  // };

  // const user = new CognitoUser({ Username, Pool });

  // const authDetails = new AuthenticationDetails({ username, password });

  // user.authenticateUser(authDetails, {
  const onSubmit = e => {
    e.preventDefault();

    const user = new CognitoUser({ Username: username, Pool: UserPool });
    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    user.authenticateUser(authDetails, {
      onSuccess: data => {
        console.log('onSuccess: ', data);
        setIsLoggedIn(true);
        // resolve(data);
      },
      onFailure: err => {
        console.error('onFailure: ', err);
        // reject(err);
      },
      newPasswordRequired: function(userAttributes, requiredAttributes) {
        // User was signed up by an admin and must provide new
        // password and required attributes, if any, to complete
        // authentication.
        console.log('user attri', userAttributes, this);

        // the api doesn't accept this field back
        delete userAttributes.email_verified;

        // unsure about this field, but I don't send this back
        delete userAttributes.phone_number_verified;

        // Get these details and call
        user.completeNewPasswordChallenge(password, userAttributes, this);
        // resolve(data);
      },
    });
  };

  // });

  if (isLoggedIn)
    // return <Redirect to="/viewer/1.3.6.1.4.1.18047.1.11.11616749948975" />;
    return <Redirect to="/dashboard" />;
  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={onSubmit}>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="username"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="password"
          />
          <button>login</button>

          {/* <label htmlFor="username">User Name</label>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
        ></input>
        <button type="submit">Login</button> */}
        </form>
      </div>
    </div>
  );
};
export default withRouter(LoginPage);
