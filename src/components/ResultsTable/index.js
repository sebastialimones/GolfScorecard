/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect, useState, useCallback } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { red, green } from '@material-ui/core/colors';
import { convertStrokesWHandicapToPoints } from '../Helpers';

const StyledTableCell = withStyles((theme) => ({
  head: {
  },
  body: {
    fontSize: 11,
  },
}))(TableCell);

const StyledTableCellBest = withStyles((theme) => ({
  head: {
  },
  body: {
    fontSize: 12,
    color: green[600],
  },
}))(TableCell);

const StyledTableCellWorst = withStyles((theme) => ({
  head: {
  },
  body: {
    fontSize: 12,
    color: red[500],
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export const ResultsTable = ({ results, playerHandicap }) => {
  const [rows, setRows] = useState([]);

  const calculateResultPerHole = useCallback((holeNumber, results) => {
    let sumResultsPerHole, averageResultPerHole, bestResult;
    let numberMosques = 0;
    if(results.length){
      const resultsWithousStringMosques = results.filter(result => (typeof result === 'number') && !!result);
      const handicap = playerHandicap[0].holeHandicap[holeNumber - 1].result;
      const numberOfGames = results.length
      const stringMosques = results.filter(result => (typeof result === 'string') && !!result).length;
      if(resultsWithousStringMosques.length){
        sumResultsPerHole = resultsWithousStringMosques.reduce((a, b) => a + b, 0);
        averageResultPerHole = (sumResultsPerHole / resultsWithousStringMosques.length).toPrecision(2);
        bestResult = Math.min.apply(null,resultsWithousStringMosques);
        resultsWithousStringMosques.map((hole) => {
          const strokesWithHandicap = hole - playerHandicap[0].result[holeNumber - 1].result;
          const pointsPerHole = convertStrokesWHandicapToPoints(strokesWithHandicap, playerHandicap[0].holeHandicap[holeNumber - 1].result);
          if(pointsPerHole === 0){
            numberMosques = numberMosques + 1;
          };
          return undefined;
        });
      };
      const totalMosques = stringMosques + numberMosques
      return createData(holeNumber, averageResultPerHole, bestResult, totalMosques, handicap, numberOfGames);
    }
    return undefined;
  }, [playerHandicap]);
  
  const getResultPerHole = useCallback((holeNumber) => {
    const individualHoleResults = []
    results.map((game) => {
      return game.result.filter((hole) => hole.holeNumber === holeNumber && hole.result !== 0
        ? individualHoleResults.push(hole.result)
        : null)
    });
    return calculateResultPerHole(holeNumber, individualHoleResults)
  },[results, calculateResultPerHole]);

  const iterateOnAllHoles = useCallback(() => {
    setRows([]);
    const numberOfHoles = 18;
    for (var holeNumber = 0; holeNumber < numberOfHoles; holeNumber++) {
      getResultPerHole(holeNumber + 1, results);
    } 
  },[getResultPerHole, results]);

  useEffect(() => {
    if(results){
      iterateOnAllHoles();
    }
  },[results, iterateOnAllHoles]);
  
  const createData = (forat, averageResultPerHole, bestResult, totalMosques, handicap, numberOfGames) => {
    setRows(rows => [ ...rows, { forat, averageResultPerHole, bestResult, totalMosques, handicap, numberOfGames }])
    return;
  };

  return (
    <TableContainer component={ Paper }>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Nº</StyledTableCell>
            <StyledTableCell align="left">Hdp</StyledTableCell>
            <StyledTableCell align="left">Media</StyledTableCell>
            <StyledTableCell align="left">Mejor</StyledTableCell>
            <StyledTableCell align="left">🦟</StyledTableCell>
            <StyledTableCell align="left">Núm</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { rows 
            ? rows.map((row) => (
            <StyledTableRow key={row.forat}>
              <StyledTableCell component="th" scope="row">
                {row.forat}
              </StyledTableCell>
              <StyledTableCell align="left">{row.handicap}</StyledTableCell>
              {
                row.averageResultPerHole < row.handicap + 1 &&
                (row.totalMosques/row.numberOfGames * 100) < 21 
                  ? <StyledTableCellBest align="left">{row.averageResultPerHole}</StyledTableCellBest>
                  : row.averageResultPerHole > row.handicap + 1.5 ||
                  (row.totalMosques/row.numberOfGames * 100) > 30 
                    ? <StyledTableCellWorst align="left">{row.averageResultPerHole}</StyledTableCellWorst>
                    : <StyledTableCell align="left">{row.averageResultPerHole}</StyledTableCell>
              }
              {
                row.bestResult < row.handicap 
                  ? <StyledTableCellBest align="left">{row.bestResult}</StyledTableCellBest>
                  : <StyledTableCell align="left">{row.bestResult}</StyledTableCell>
              }
              <StyledTableCell align="left">{row.totalMosques}</StyledTableCell>
              <StyledTableCell align="left">{row.numberOfGames}</StyledTableCell>
            </StyledTableRow>
          ))
          : null
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}