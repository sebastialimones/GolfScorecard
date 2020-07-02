import React, { useState, useEffect } from 'react';
import styled  from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { auth } from '../../services';
import { errorCodes } from './helpers';
import { Notification } from '../Notification';
import { Button } from '../../components/Elements/button';
import { createUser } from '../../services/createUser';
import media from '../../styles/media';
import { useCurrentUser } from '../../hooks/userCurrentUser';

const Wrapper = styled.div`
  background-color: white;
  right: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  margin: 0;
  ${ media.mediumScreen`
    flex-direction: column;
    width: 100%;
  `}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormArea = styled.div`
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${ media.mediumScreen`
    width: 100%;
  `}
`;

const BackToLogin = styled.div`
  margin: 1.7rem 0 0 0;
  font-size: 12px;
  color: gray;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PositionedButton = styled(Button)`
  margin: 2rem 0 0 0;
`;

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 0 1rem 0',
    minWidth: '14rem',
  },
}));

export const SignUp = ({ history }) => {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorCode, setErrorCode] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const [user, isFetchingUser] = useCurrentUser();
  const userId = user && user.id;
  const classes = useStyles();

  useEffect(() => {
    userId && !isFetchingUser &&
    createUser(user)
  }, [userId, user, isFetchingUser]);

  const clearInputs = () => {
    setNewEmail('');
    setNewPassword('');
  };

  const handleNewEmailChange = (event) => {
    setNewEmail(event.currentTarget.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.currentTarget.value);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorCode();
    clearInputs()
    setOpenAlert(false);
  };

  const handleBackToLogin = (event) => {
    history.push('./login')
  };

  const register = async (event) => {
    event.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(newEmail, newPassword);
      history.push('/');
    } catch (error) {
      console.log(error)
      const errorCode = errorCodes[error.code];
      errorCode.message = error.message ? error.message: errorCode.message;
      setOpenAlert(true)
      setErrorCode(errorCode);
    }
  }
  return (
    <Wrapper>
      <FormArea>
        <Form onSubmit={ register }>
          <FormControl className={classes.root}>
          <InputLabel htmlFor="email">Email</InputLabel>
             <Input
               id="email"
               onChange={ handleNewEmailChange }
               type="email"
               value={newEmail}
             />
           </FormControl>
          <FormControl className={classes.root}>
           <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
           <Input
             id="standard-adornment-password"
             onChange={ handleNewPasswordChange }
             type={ 'text' }
             value={ newPassword }
           />
        </FormControl>
        <ButtonContainer>
          <PositionedButton type="submit" primary>Registra't</PositionedButton>
          <BackToLogin onClick={ handleBackToLogin }>Torna a inici de sessió</BackToLogin>
        </ButtonContainer>
        </Form>
      </FormArea>
      <Notification
        onClose={ handleCloseAlert }
        message={ errorCode && errorCode.message }
        open={ openAlert }
        severity={errorCode && errorCode.severity}
      />
    </Wrapper>
  );
}
