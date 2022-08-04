import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '../Elements/button';
import { useCurrentUser } from '../../hooks/userCurrentUser';
import { Notification } from '../Notification';
import { createRanking } from '../../services';

const Container = styled.div`
  margin: 1em;
`;

const InputContainer = styled.form``;

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

export const RankingDashboard = ({ history }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [errorCode, setErrorCode] = useState();
  const [user, isFetchingUser] = useCurrentUser();
  const currentUserId = user && user.id;

  useEffect(() => {
    !currentUserId && !isFetchingUser && history.push('/landing');
  }, [isFetchingUser, history, currentUserId, user]);

  const onChangeName = (event) => {
    setName(event.currentTarget.value);
  };

  const onChangeCode = (event) => {
    setCode(event.currentTarget.value);
  };

  const send = async (event) => {
    event.preventDefault();
    const codeToString = code.toString().toUpperCase();
    if(name && code){
      try {
          const ranking = await createRanking({
          name,
          codeToString,
          });
          ranking !== 'error'
          ? setOpenAlert(true)
          : console.log('error')
      }
      catch (error){
          errorCode.message = error.message ? error.message: errorCode.message;
          setOpenAlert(true)
          setErrorCode(errorCode);
      };
      return;
    }else {
      const errorCode = { 
        message:  "Falta introduir un nom o codi",
        severity: "error" 
       }
      setErrorCode(errorCode);
      setOpenAlert(true)
    };
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return(
    <Container>
      <InputContainer className={classes.root} noValidate autoComplete="off">
        <TextField 
          id="standard-basic" 
          label="Nombre del ranking" 
          onChange={ onChangeName }
          value={ name } 
        />
        <TextField
          id="date"
          label="Código del ranking"
          onChange={ onChangeCode }
          value={ code }
        />
      </InputContainer>
      <Button type="submit" primary onClick={ send }>Enviar</Button>
      <Notification
          onClose={ handleCloseAlert }
          message={ errorCode ? errorCode.message : 'Guardado' }
          open={ openAlert }
          severity={ errorCode ? errorCode.severity : "success" }
      />
    </Container>
  )
};
  