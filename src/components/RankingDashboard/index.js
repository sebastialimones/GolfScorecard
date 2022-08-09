import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '../Elements/button';
import { useCurrentUser } from '../../hooks/userCurrentUser';
import { Notification } from '../Notification';
import { createRanking, deactivateRanking } from '../../services';
import { fetchUserProfile, fetchRankingsPerUser } from '../../services';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Container = styled.div`
  margin: 1em;
`;
const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const RankingName = styled.div`
`;
const Heading = styled.div``;
const InactivateRankingContainer = styled.div`
  margin-top: 2em;
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
  const [selectedRanking, setSelectedRanking] = useState('');

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

  const deactivate = async (event) => {
    event.preventDefault();
    if(rankingDetails.length){
      const rankindIdExtractor = () => {
        const rankingId = [];
        rankingDetails.map((ranking) => {
          if(ranking.name === selectedRanking){
            rankingId.push(ranking.id);
            deactivateRanking(ranking.id);
          };
        return undefined;
        });
      };
      rankindIdExtractor();
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleChange = (event) => {
    setSelectedRanking(event.target.value);
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
          message={ errorCode ? errorCode.message : 'Guardado' }
          open={ openAlert }
          severity={ errorCode ? errorCode.severity : "success" }
      />
      <InactivateRankingContainer>
        <Heading>
        Desactivar un ranking
        </Heading>
        <Container>
          {rankingName.length && rankingName.map((rankingItem, index) => (
            <RankingContainer  key={ index }>
              <RankingName >{ rankingItem }</RankingName>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={ selectedRanking }
                onChange={ handleChange }
              >
                <FormControlLabel value={ rankingItem } key={ index } control={<Radio />}/>
              </RadioGroup>
            </RankingContainer>
          ))}  
        </Container>
        <Button type="submit" primary onClick={ deactivate }>Desactivar</Button>
      </InactivateRankingContainer>
    </Container>
  )
};
  