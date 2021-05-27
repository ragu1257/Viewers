import React, { createContext } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from '../../UserPool';

const AccountContext = createContext();

const Account = (props) => {
  const authenticate = async (username, password) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });

      const authDetails = new AuthenticationDetails({ username, password });

      user.authenticateUser(authDetails, {
        onSuccess: data => {
          console.log('onSuccess: ', data);
          resolve(data);
          // setIsLoggedIn(true);
        },
        onFailure: err => {
          console.error('onFailure: ', err);
          reject(err);
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
          resolve(data);
        },
      });
    });
  };
  return (
    <AccountContext.Provider value={{ authenticate }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };

// const AppContext = createContext();
// export const UserProvider = AppContext.Provider
// export const UserConsumer = AppContext.Consumer

// export default AppContext;
