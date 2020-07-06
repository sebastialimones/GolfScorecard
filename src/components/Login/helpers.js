// Error codes extracted from firebase docs:
// https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword

export const loginErrorCodes = {
  'auth/invalid-email': {
    id: 1,
    code: 'auth/invalid-email',
    message: 'Error: La dirección de email no es válida.',
    severity: 'error',
  },
  'auth/user-disabled': {
    id: 2,
    code: 'auth/user-disabled',
    message: 'Error: Este usuario ha sido desactivado.',
    severity: 'error',
  },
  'auth/user-not-found': {
    id: 3,
    code: 'auth/user-not-found',
    message: 'Error: Este usuario no existe',
    severity: 'error',
  },
  'auth/wrong-password': {
    id: 4,
    code: 'auth/wrong-password',
    message: 'Error: Este password no es correcto.',
    severity: 'error',
  },
  'auth/no-email': {
    id: 5,
    code: 'no-email',
    message: 'Error: No hay dirección de email',
    severity: 'error',
  },
};

export const signUpErrorCodes = {
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