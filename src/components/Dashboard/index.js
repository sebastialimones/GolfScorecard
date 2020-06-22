import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

import { Players } from '../Players';
import { fetchResults, fetchPlayer } from '../../services/index';
import { ListOfResults } from '../ListOfResults';
import { ResultsTable } from '../ResultsTable';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

const Container = styled.div` 
`;

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const DataContainer = styled.div`
  margin: 1em;
`;

const SwitchContainer = styled.div`
`;

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
    height: '90%',
  },
  checked: {},
}))(Switch);

export const Dashboard = () => {
  const [player, setPlayer] = useState('');
  const [gamesResults, setGamesResults] = useState();
  const [playerHandicap, setplayerHandicap] = useState();
  const [switchState, setSwitchState] = useState({
    checkedA: true,
  });

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

  const handleSwitchChange = (event) => {
    setSwitchState({ ...switchState, [event.target.name]: event.target.checked });
  };

  return(
    <Container>
      <MenuContainer>
        <Players handlePlayerChange={ handlePlayerChange } value={ player } />
        <SwitchContainer>
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Holes</Grid>
            <Grid item>
              <AntSwitch checked={ switchState.checkedA } onChange={ handleSwitchChange } name="checkedA" />
            </Grid>
            <Grid item>Results</Grid>
          </Grid>
        </SwitchContainer>
      </MenuContainer>
      <DataContainer>
        {
          playerHandicap && gamesResults && switchState.checkedA &&
          <ListOfResults results={ gamesResults } playerHandicap={ playerHandicap } />
        }
        {
          playerHandicap && gamesResults && !switchState.checkedA &&
          <ResultsTable results={ gamesResults }/>
        }
      </DataContainer>
    </Container>
  )
};

