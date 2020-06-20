import React from 'react';
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
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(forat, mitjanaCops, millorResultat, mosques, nombrePartides) {
  console.log({ forat, mitjanaCops, millorResultat, mosques, nombrePartides })
  return { forat, mitjanaCops, millorResultat, mosques, nombrePartides };
}

const rows = [
  createData('1', 159, 6.0, 24, 4.0),
  createData('2', 237, 9.0, 37, 4.3),
  createData('3', 262, 16.0, 24, 6.0),
  createData('4', 305, 3.7, 67, 4.3),
  createData('5', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    // minWidth: 10,
    // maxWidth: 10,
  },
});

export const ResultsTable = ({ results }) => {
  const classes = useStyles();
  const completeResult = [];


  return (
    <TableContainer component={ Paper }>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Forat</StyledTableCell>
            <StyledTableCell align="right">Mitjana cops</StyledTableCell>
            <StyledTableCell align="right">Millor resultat</StyledTableCell>
            <StyledTableCell align="right">Mosques</StyledTableCell>
            <StyledTableCell align="right">Partides</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.forat}>
              <StyledTableCell component="th" scope="row">
                {row.forat}
              </StyledTableCell>
              <StyledTableCell align="right">{row.mitjanaCops}</StyledTableCell>
              <StyledTableCell align="right">{row.millorResultat}</StyledTableCell>
              <StyledTableCell align="right">{row.millorResultat}</StyledTableCell>
              <StyledTableCell align="right">{row.nombrePartides}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}