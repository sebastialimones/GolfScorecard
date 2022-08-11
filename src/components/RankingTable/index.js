/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect, useCallback } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { fetchPlayers } from '../../services';

const StyledTableCell = withStyles((theme) => ({
  head: {
  },
  body: {
    fontSize: 11,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export const RankingTable = ({ gamesRanking, selectedRankingDetails }) => {
  const [rows, setRows] = useState([]);
  const [scores, setScores] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getAllPlayers();   
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const createRowsWithResults = useCallback (() => {
    let position = 0;
    scores.sort((result1, result2) => result2.average - result1.average)
    scores.map((player) => {
      position = position + 1;
      createData(position, player.name, player.average, player.results.length);
      return undefined;
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scores]);
  
  const getResultPerPlayer = useCallback((playerId) => {
    const playerResults = [];
    gamesRanking.map((game) => {
      if(game.uid === playerId){
        playerResults.push(game.rating);
      }; 
      return playerResults;
    });
    return playerResults;
  },[gamesRanking]);

  const getAllPlayers = useCallback(async () => {
    const players = await fetchPlayers();
    setPlayers(players)
  }, []);

  const getPlayersName = useCallback((playerId) => {
    const playerProfile = players.filter((player)=> player.uid === playerId)
    if(playerProfile[0].name){
      return playerProfile[0].name
    }else{
      return;
    }
  }, [players]);
  
  const calculateRankingResult = useCallback (() => {
    const scoreAgregator = [];
    selectedRankingDetails.players.map((playerId) => {
      const resultPerPlayer = getResultPerPlayer(playerId);
      const playerName = getPlayersName(playerId);
      const averageResult = resultPerPlayer.length && (resultPerPlayer.reduce((a, b) => a + b) / (resultPerPlayer.length));
      let averageResultWithGamesPlayed = 0;
      if(resultPerPlayer.length){
        averageResultWithGamesPlayed = (averageResult - (1 / resultPerPlayer.length)).toFixed(2)
      };
      scoreAgregator.push({ 
        name: playerName,
        results: resultPerPlayer,
        average: averageResultWithGamesPlayed,
      });
      return scoreAgregator;
    });
    setScores(scoreAgregator);
    return undefined;
  }, [getPlayersName, getResultPerPlayer, selectedRankingDetails.players]);

  useEffect(() => {
    if(selectedRankingDetails && scores.length < selectedRankingDetails.games.length && players.length){
      setScores([]);
      setRows([]);
      calculateRankingResult();
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[gamesRanking, selectedRankingDetails, players.length]);

  useEffect(() => {
    createRowsWithResults();
  },[scores, createRowsWithResults, players]);

  const createData = (position, name, result, games) => {
    if(rows.length <= selectedRankingDetails.players.length){
      setRows(rows => [ ...rows, { position, name, result, games }]);
    };
    return;
  };

  return (
    <TableContainer component={ Paper }>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Pos</StyledTableCell>
            <StyledTableCell align="left">Nombre</StyledTableCell>
            <StyledTableCell align="left">Resultado</StyledTableCell>
            <StyledTableCell align="left">Partidas</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        { rows.length 
            ? rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">{row.position}</StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="left">{row.result}</StyledTableCell>
                <StyledTableCell align="left">{row.games}</StyledTableCell>
              </StyledTableRow>
              ))
            : null
        }
        </TableBody>
      </Table>
    </TableContainer>
  );
}