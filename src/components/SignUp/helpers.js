// Error codes extracted from firebase docs:
// https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword

export const errorCodes = {
  'auth/email-already-in-use': {
    id: 1,
    code: 'email-already-in-use',
    message: 'Error: Ya existe una cuenta con tu cuenta de email.',
    severity: 'error',
  },
  'auth/invalid-email': {
    id: 2,
    code: 'invalid-email',
    message: 'Error: Este email no es válido.',
    severity: 'error',
  },
  'auth/operation-not-allowed': {
    id: 3,
    code: 'operation-not-allowed',
    message: 'Error: Email/password no es válido.',
    severity: 'error',
  },
  'auth/weak-password': {
    id: 4,
    code: 'weak-password',
    message: 'Error: Password es demasiado débil.',
    severity: 'error',
  },
};
