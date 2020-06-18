import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Players } from '../Players';
import { fetchResults, fetchPlayer } from '../../services/index';
import { ListOfResults } from '../ListOfResults';

const Container = styled.div`
  margin-left: 1em;
`;

export const Dashboard = () => {
  const [player, setPlayer] = useState('');
  const [gamesResults, setGamesResults] = useState();
  const [playerHandicap, setplayerHandicap] = useState();

  useEffect(() => {
    const getResult = async () => {
      const data = await fetchResults(player);
      setGamesResults(data);
    }
    const getPlayerHandicap = async () => {
      const data = await fetchPlayer(player);
      setplayerHandicap(data);
    }
    player && getResult() && getPlayerHandicap() 
  },[player])

  const handlePlayerChange = (playerName) => {
    setPlayer('');
    setPlayer(playerName);
  }

  return(
    <Container>
      <Players handlePlayerChange={ handlePlayerChange } value={ player } />
        {
        playerHandicap && gamesResults &&
        <ListOfResults results={ gamesResults } playerHandicap={ playerHandicap } />
        }
    </Container>
  )
};

