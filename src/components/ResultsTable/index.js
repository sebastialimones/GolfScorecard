import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    // minWidth: 10,
    // maxWidth: 10,
  },
});

export const ResultsTable = ({ results }) => {
  const [rows, setRows] = useState([]);
  const classes = useStyles();
  
  const getResultPerHole = (holeNumber) => {
    const individualHoleResults = []
    results
    .map((game) => {
      game.result.filter((hole) => hole.holeNumber === holeNumber 
      ? individualHoleResults.push(hole.result)
      : null)
    })
    return calculateResultPerHole(holeNumber, individualHoleResults)
  }
  
  const calculateResultPerHole = (holeNumber, results) => {
    let sumResultsPerHole, averageResultPerHole, bestResult;
    if(results.length){
      const resultsWithoutMosques = results.filter(result => (typeof result === 'number') && !!result);
      const numberOfMosques = results.filter(result => (typeof result === 'string') && !!result).length;
      const numberOfGames = results.length;
      if(resultsWithoutMosques.length){
        sumResultsPerHole = resultsWithoutMosques.reduce((a, b) => a + b, 0);
        averageResultPerHole = sumResultsPerHole / resultsWithoutMosques.length;
        bestResult = Math.min.apply(null,resultsWithoutMosques);
      }
      return createData(holeNumber, averageResultPerHole, bestResult, numberOfMosques, numberOfGames);
    }
    return undefined;
  }

  const iterateOnAllHoles = () => {
    setRows([]);
    const numberOfHoles = 18;
    for (var holeNumber = 0; holeNumber < numberOfHoles; holeNumber++) {
      getResultPerHole(holeNumber + 1, results);
    } 
  }
  
  useEffect(() => {
    if(results){
      iterateOnAllHoles()
    }
  },[results])
  
  const createData = (forat, averageResultPerHole, bestResult, numberOfMosques, numberOfGames) => {
    setRows(rows => [ ...rows, { forat, averageResultPerHole, bestResult, numberOfMosques, numberOfGames }])
    return;
  }

  return (
    <TableContainer component={ Paper }>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Forat</StyledTableCell>
            <StyledTableCell align="left">Mitjana cops</StyledTableCell>
            <StyledTableCell align="left">Millor resultat</StyledTableCell>
            <StyledTableCell align="left">Mosques</StyledTableCell>
            <StyledTableCell align="left">Partides</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { rows 
            ? rows.map((row) => (
            <StyledTableRow key={row.forat}>
              <StyledTableCell component="th" scope="row">
                {row.forat}
              </StyledTableCell>
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