import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '../../UserPool';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: username,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    user.authenticateUser(authDetails, {
      onSuccess: data => {
        console.log('onSuccess: ', data);
      },
      onFailure: err => {
        console.error('onFailure: ', err);
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
      },
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">User Name</label>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default withRouter(LoginPage);
