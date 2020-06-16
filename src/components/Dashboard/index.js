import React, { useState, useEffect } from 'react';
import { Players } from '../Players';
import { fetchResults, fetchPlayer } from '../../services/index';
import { Result } from '../Result';

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
      calculator()
    }
    player && getResult() && getPlayerHandicap() 
  }, [player])

  const handlePlayerChange = (playerName) => {
    setPlayer(playerName)
  }

  const calculator = () => {
    console.log(gamesResults)
    console.log(playerHandicap)

  }

  return(
    <React.Fragment>
      <Players handlePlayerChange={ handlePlayerChange } value={ player } />
      <Result playerDetails={ playerHandicap } gamesResults={ gamesResults }/>
    </React.Fragment>
  )
};

