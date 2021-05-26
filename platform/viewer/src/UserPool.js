import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'eu-central-1_5RSpK79bO',
  ClientId: '2sljbdekjuckkgmihm5b5nbes0',
};

export default new CognitoUserPool(poolData);
