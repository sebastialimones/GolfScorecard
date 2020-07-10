import React, { useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { auth } from '../../services';
import { signUpErrorCodes, loginErrorCodes } from './helpers';
import { Notification } from '../Notification';
import { Button } from '../../components/Elements/button';
import media from '../../styles/media'

const Wrapper = styled.div`
  background-color: white;
  right: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  margin: 0;
  width: 18rem;
  ${media.mediumScreen`flex-direction: column;`}
  ${media.mediumScreen`width: 100%;`}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormArea = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5em;
`;

const PositionedButtonLogin = styled(Button)`
  margin: 1rem 0 0 0;
`;

const PositionedButtonSignUp = styled(Button)`
  margin: 1rem 0 0 0;
`;

const  ForgotPassword = styled.div`
  margin: 1.7rem 0 0 0;
  font-size: 12px;
  color: gray;
`;

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 0 1rem 0',
    minWidth: '14rem',
  },
}));

export const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorCode, setErrorCode] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const classes = useStyles();

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const handleEmailChange = (event) => {
    setEmail(event.currentTarget.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.currentTarget.value);
  };

  const handleForgotPassword = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      setOpenAlert(true);
    } catch (error) {
      const errorCode = loginErrorCodes[error.code];
      errorCode.message = error.message ? error.message: errorCode.message;
      setErrorCode(errorCode);
      setOpenAlert(true);
    }
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      const errorCode = loginErrorCodes[error.code];
      errorCode.message = error.message ? error.message: errorCode.message;
      setOpenAlert(true);
      setErrorCode(errorCode);
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorCode();
    clearInputs()
    setOpenAlert(false);
  };

  const signUp = async (event) => {
    event.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      const errorCode = signUpErrorCodes[error.code];
      errorCode.message = error.message ? error.message: errorCode.message;
      setOpenAlert(true)
      setErrorCode(errorCode);
    }
  }

  return (
    <Wrapper>
      <FormArea>
        <Form onSubmit={ login }>
          <TextField
            id="email"
            label="Email"
            onChange={ handleEmailChange }
            value={ email }
            className={classes.root}
          />
          <TextField
            id="password"
            label="Password"
            onChange={ handlePasswordChange }
            value={ password }
            className={classes.root}
          />
          <ButtonsContainer>
            <PositionedButtonLogin primary type="submit">Inicia sesión</PositionedButtonLogin>
            <PositionedButtonSignUp type="button" onClick={ signUp }>Regístrate</PositionedButtonSignUp>
            <ForgotPassword onClick={ handleForgotPassword }>¿Has olvidado la contraseña?</ForgotPassword>
          </ButtonsContainer>
        </Form>
      </FormArea>
      
      <Notification
        onClose={ handleCloseAlert }
        message={ errorCode ? errorCode.message : "Mail enviado!" }
        open={ openAlert }
        severity={  errorCode ? errorCode.severity : "success" }
      />
    </Wrapper>
  );
}
