// Error codes extracted from firebase docs:
// https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword

export const errorCodes = {
  'auth/email-already-in-use': {
    id: 1,
    code: 'email-already-in-use',
    message: 'Error: Already exists an account with the given email address.',
    severity: 'error',
  },
  'auth/invalid-email': {
    id: 2,
    code: 'invalid-email',
    message: 'Error: Email address is not valid.',
    severity: 'error',
  },
  'auth/operation-not-allowed': {
    id: 3,
    code: 'operation-not-allowed',
    message: 'Error: Email/password accounts are not enabled.',
    severity: 'error',
  },
  'auth/weak-password': {
    id: 4,
    code: 'weak-password',
    message: 'Error: Password is not strong enough.',
    severity: 'error',
  },
};
