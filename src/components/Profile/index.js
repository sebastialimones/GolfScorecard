import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '../../components/Elements/button';
import { createOrUpdateUserProfile } from '../../services';
import { fetchUserProfile } from '../../services'; 
import { useCurrentUser } from '../../hooks/userCurrentUser';
import { Notification } from '../../components/Notification';

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

export const Profile = ({ history }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [errorCode, setErrorCode] = useState();
  const [dbUserProfile, setDbUserProfile] = useState();
  const [user, isFetchingUser] = useCurrentUser();
  const currentUserId = user && user.id;

  useEffect(() => {
    !currentUserId && !isFetchingUser && history.push('/landing');
  }, [isFetchingUser, history, currentUserId, user]);

  useEffect(() => {
    if(user){
      const getPlayerProfile = async () => {
        const data = await fetchUserProfile(currentUserId);
        setDbUserProfile(data);
        if(data.name){
          setName(data.name);
        };
        if(data.birthDate){
          setBirthDate(data.birthDate);
        };
      };
      getPlayerProfile();
    }
  },[currentUserId, user]);

  const onChangeName = (event) => {
    setName(event.currentTarget.value);
  };

  const onChangeDate = (event) => {
    setBirthDate(event.currentTarget.value);
  };

  const send = async (event) => {
    event.preventDefault();
    try {
      const gameResult = await createOrUpdateUserProfile({
        name,
        birthDate,
        dbUserProfile
      });
      gameResult !== 'error'
      ? setOpenAlert(true)
      : console.log('error')
    }
    catch (error){
      errorCode.message = error.message ? error.message: errorCode.message;
      setOpenAlert(true)
      setErrorCode(errorCode);
    }
  };

  const handleCloseAlert = () => {
    setErrorCode();
    setOpenAlert(false);
  };

  return(
    <Container>
      <InputContainer className={classes.root} noValidate autoComplete="off">
        <TextField 
          id="standard-basic" 
          label="Nombre" 
          onChange={ onChangeName }
          value={ name } 
        />
        <TextField
          id="date"
          label="Fecha de nacimiento"
          type="date"
          onChange={ onChangeDate }
          value={ birthDate }
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
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
  