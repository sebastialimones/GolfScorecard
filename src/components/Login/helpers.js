// Error codes extracted from firebase docs:
// https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword

export const errorCodes = {
  'auth/invalid-email': {
    id: 1,
    code: 'auth/invalid-email',
    message: 'Error: Email address is not valid.',
    severity: 'error',
  },
  'auth/user-disabled': {
    id: 2,
    code: 'auth/user-disabled',
    message: 'Error: User corresponding to the given email has been disabled.',
    severity: 'error',
  },
  'auth/user-not-found': {
    id: 3,
    code: 'auth/user-not-found',
    message: 'Error: There is no user corresponding to the given email.',
    severity: 'error',
  },
  'auth/wrong-password': {
    id: 4,
    code: 'auth/wrong-password',
    message: 'Error: The password is invalid for the given email, or the account corresponding to the email does not have a password set.',
    severity: 'error',
  },
};
