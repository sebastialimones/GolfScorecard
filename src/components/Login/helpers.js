// Error codes extracted from firebase docs:
// https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword

export const errorCodes = {
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
