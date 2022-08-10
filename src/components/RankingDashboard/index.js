import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '../Elements/button';
import { useCurrentUser } from '../../hooks/userCurrentUser';
import { Notification } from '../Notification';
import { createRanking } from '../../services';
import { fetchUserProfile, fetchRankingsPerUser } from '../../services';
import { DeactivateRankingComponent } from '../DeactivateRanking';

const Container = styled.div`
  margin: 1em;
`;
const Heading = styled.div``;

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
  const [user, isFetchingUser] = useCurrentUser();
  const [userProfile, setUserProfile] = useState('');
  const classes = useStyles();
  const [newVerifyedRanking, setNewVerifyedRanking] = useState(false)
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [rankingName, setRankingName] = useState('');
  const [rankingDetails, setRankingDetails] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [errorCode, setErrorCode] = useState();
  const currentUserId = user && user.id;

  useEffect(() => {
    !currentUserId && !isFetchingUser && history.push('/landing');
  }, [isFetchingUser, history, currentUserId, user]);

  useEffect(() => {
    const getUserProfile = async () => {
      const userProfile = await fetchUserProfile(currentUserId);
      setUserProfile(userProfile)
    };
    user && getUserProfile();
  },[user, currentUserId, newVerifyedRanking]);

  useEffect(() => {
    const getRankings = async () => {
      if(userProfile.rankingsIds.length){
        const rankings = await fetchRankingsPerUser(userProfile.rankingsIds);
        setRankingDetails([]);
        setRankingDetails(rankings);
      };
    };
    setNewVerifyedRanking(false);
    currentUserId && userProfile && getRankings();
  }, [user, currentUserId, userProfile]);

  useEffect(() => {
    if(rankingDetails.length){
      const rankingsName = () => {
        const rankingsName = [];
        rankingDetails && rankingDetails.map((ranking) => {
          const obj = { value: ranking.name, label: ranking.name, id: ranking.id }
          rankingsName.push((obj));
          setRankingName(rankingsName => [...rankingsName, ranking.name]);
          return undefined;
        });
      };
      rankingsName();
    }
  }, [rankingDetails]);

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

  const onChangeRankingState = (newRankingName) => {
    setRankingName(newRankingName);
  };

  return(
    <Container>
      <Heading>
        Crear un nuevo ranking
      </Heading>
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
          message={ errorCode ? errorCode.message : 'Fet!' }
          open={ openAlert }
          severity={ errorCode ? errorCode.severity : "success" }
      />
      { rankingDetails.length && rankingName.length ?
        <DeactivateRankingComponent
          rankingName={ rankingName }
          rankingDetails={ rankingDetails }
          onChangeRankingState={ onChangeRankingState }
        />
        :
        'No hay rankings'
      }
    </Container>
  )
};
  