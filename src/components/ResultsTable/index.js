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
    if(results.length){
      const resultsWithoutMosques = results.filter(result => (typeof result === 'number') && !!result);
      const numberOfMosques = results.filter(result => (typeof result === 'string') && !!result).length;
      const handicap = playerHandicap[0].holeHandicap[holeNumber - 1].result;
      const numberOfGames = results.length
      if(resultsWithoutMosques.length){
        sumResultsPerHole = resultsWithoutMosques.reduce((a, b) => a + b, 0);
        averageResultPerHole = (sumResultsPerHole / resultsWithoutMosques.length).toPrecision(2);
        bestResult = Math.min.apply(null,resultsWithoutMosques);
      }
      return createData(holeNumber, averageResultPerHole, bestResult, numberOfMosques, handicap, numberOfGames);
    }
    return undefined;
  }, [playerHandicap]);
  
  const getResultPerHole = useCallback((holeNumber) => {
    const individualHoleResults = []
    results.map((game) => {
      return game.result.filter((hole) => hole.holeNumber === holeNumber 
        ? individualHoleResults.push(hole.result)
        : null)
    })
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
      iterateOnAllHoles()
    }
  },[results, iterateOnAllHoles]);
  
  const createData = (forat, averageResultPerHole, bestResult, numberOfMosques, handicap, numberOfGames) => {
    setRows(rows => [ ...rows, { forat, averageResultPerHole, bestResult, numberOfMosques, handicap, numberOfGames }])
    return;
  }

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
                (row.numberOfMosques/row.numberOfGames * 100) < 21 
                  ? <StyledTableCellBest align="left">{row.averageResultPerHole}</StyledTableCellBest>
                  : row.averageResultPerHole > row.handicap + 1.5 ||
                  (row.numberOfMosques/row.numberOfGames * 100) > 30 
                    ? <StyledTableCellWorst align="left">{row.averageResultPerHole}</StyledTableCellWorst>
                    : <StyledTableCell align="left">{row.averageResultPerHole}</StyledTableCell>
              }
              {
                row.bestResult < row.handicap 
                  ? <StyledTableCellBest align="left">{row.bestResult}</StyledTableCellBest>
                  : <StyledTableCell align="left">{row.bestResult}</StyledTableCell>
              }
              <StyledTableCell align="left">{row.numberOfMosques}</StyledTableCell>
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