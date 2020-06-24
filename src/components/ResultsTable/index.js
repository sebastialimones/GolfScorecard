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
  }, []);
  
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
  },[results, iterateOnAllHoles])
  
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
            <StyledTableCell align="left">Mitja</StyledTableCell>
            <StyledTableCell align="left">Millor</StyledTableCell>
            <StyledTableCell align="left">🦟</StyledTableCell>
            <StyledTableCell align="left">Nombre</StyledTableCell>
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
              <StyledTableCell align="left">{row.averageResultPerHole}</StyledTableCell>
              <StyledTableCell align="left">{row.bestResult}</StyledTableCell>
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