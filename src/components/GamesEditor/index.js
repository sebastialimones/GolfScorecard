/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';
import { Hole } from '../Hole';
import { Notification } from '../Notification';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { fetchResult, updateGameResult } from '../../services';
import { gameRatingCalculator } from '../Helpers';

const Container = styled.div` `;
const FadeContainer = styled.div`
  display: 'flex';
  align-Items: 'center';
`;    

const useStyles = makeStyles((theme) => ({
  root: {
    height: 300,
    flexGrow: 1,
    minWidth: 300,
    transform: 'translateZ(0)',
    '@media all and (-ms-high-contrast: none)': {
      display: 'none',
    },
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: 'gray',
  },
}));

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

export const GamesEditor = ({ result, refreshResults, playerHandicap }) => {
  const classes = useStyles();
  const [editRow, setEditRow] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [errorCode, setErrorCode] = useState();
  const [open, setOpen] = useState(false);
  const [newGameResult, setNewGameResult] = useState([]);

  useEffect(() => {
    const fetchNewResult = async () => {
      const game = await fetchResult(result.id);
      setNewGameResult(game);
    };
    fetchNewResult();
  },[result.id]);

  const handleClick = async (event) => {
    setEditRow(event)
    setOpen(true);
    const game = await fetchResult(result.id);
    setNewGameResult(game);
  };

  const handleClose = () => {
    setOpen(false);
    updateNewGameResult();
    refreshResults();
  };

  const handleCloseAlert = () => {
    setErrorCode();
    setOpenAlert(false);
  };

  const handleUpdatedResult = (holeResult) => {
    const initalState = { ...editRow, result: holeResult.result };
    setEditRow(initalState);
  };

  const updateNewGameResult =  useCallback(() => {
    if(newGameResult && editRow){
      const updatedGameResult = newGameResult.result.slice();
      updatedGameResult.map((holeResult) => {
        if(holeResult.holeNumber === editRow.holeNumber){
          updatedGameResult.splice(holeResult.holeNumber - 1, 1,{ holeNumber: editRow.holeNumber, result: editRow.result });
        };
        return undefined;
      });
      const newObjectGameResult = newGameResult;
      newObjectGameResult.result = updatedGameResult;
      const updatedGameRating = gameRatingCalculator(newGameResult, playerHandicap);
      newObjectGameResult.gameRating = updatedGameRating;
      setNewGameResult(newObjectGameResult);
    const sendUpdatedPlayer = async () => {
      try {
        await updateGameResult(newGameResult);
      }
      catch (error){
        errorCode.message = error.message ? error.message: errorCode.message;
        setOpenAlert(true)
        setErrorCode(errorCode);
      }
    }
    sendUpdatedPlayer();
    }
  },[editRow, errorCode, newGameResult, playerHandicap]);

  return (
    <Container>
      <TableContainer component={ Paper }>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Nº</StyledTableCell>
              <StyledTableCell align="left">Golpes</StyledTableCell>
              <StyledTableCell align="left">Editar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { newGameResult.result 
              ? newGameResult.result.map((row) => (
              <StyledTableRow key={row.holeNumber}>
                <StyledTableCell component="th" scope="row">
                  {row.holeNumber}
                </StyledTableCell>
                <StyledTableCell align="left">{row.result}</StyledTableCell>
                <StyledTableCell align="left">
                <IconButton
                  aria-label="more"
                  aria-controls="fade-menu"
                  aria-haspopup="true"
                  onClick={ () => handleClick(row) }
                  >
                  <EditIcon/>
                </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))
            : null
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={ classes.modal }
        open={ open }
        onClose={ handleClose }
        closeAfterTransition
        BackdropComponent={ Backdrop }
        BackdropProps={ {
          timeout: 500,
        }}
      >
        <Fade in={ open }>
          <FadeContainer className={ classes.paper }>
          {`Hoyo nº: ${editRow.holeNumber}`} <br/>
          <Hole 
            key={ editRow.forat } 
            holeNumber={ editRow.forat } 
            handleHoleResult={ handleUpdatedResult } 
            selectedCourse={ result.course } 
            label={ 'Golpes' }
            value={ editRow.result }
            />
          </FadeContainer>
        </Fade>
      </Modal>
      <Notification
        onClose={ handleCloseAlert }
        message={ errorCode ? errorCode.message : "Perfe!" }
        open={ openAlert }
        severity={ errorCode ? errorCode.severity : "success" }
      />
    </Container>
  );
}
