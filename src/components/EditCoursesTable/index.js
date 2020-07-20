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
import { updatePlayerHandicap } from '../../services';
import { Notification } from '../Notification';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

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

export const EditCoursesTable = ({ playerHandicap, selectedCourse }) => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [editRow, setEditRow] = useState('');
  const [newPlayerHandicap, setNewPlayerHandicap] = useState(playerHandicap)
  const [openAlert, setOpenAlert] = useState(false);
  const [errorCode, setErrorCode] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setNewPlayerHandicap(playerHandicap);
  },[playerHandicap])

  const calculateResultPerHole = useCallback((holeNumber, newPersonalHandicap) => {
    if(newPersonalHandicap.length){
      const handicap = playerHandicap[0].holeHandicap[holeNumber - 1].result;
      const strokesPerHole = playerHandicap[0].result[holeNumber - 1].result;
      return createData(holeNumber, handicap, strokesPerHole);
    }
    return undefined;
  }, [playerHandicap]);


  const handleClick = (event) => {
    setEditRow(event)
    setOpen(true);
  };

  const handleClose = () => {
    updatePlayer();
    setOpen(false);
  };
  
  const getResultPerHole = useCallback((holeNumber) => {
    const individualHoleResults = [];
    newPlayerHandicap.map((game) => {
      return game.result.filter((hole) => hole.holeNumber === holeNumber 
        ? individualHoleResults.push(hole.result)
        : null)
    })
    return calculateResultPerHole(holeNumber, individualHoleResults)
  },[newPlayerHandicap, calculateResultPerHole]);

  const iterateOnAllHoles = useCallback(() => {
    setRows([]);
    const numberOfHoles = 18;
    for (var holeNumber = 0; holeNumber < numberOfHoles; holeNumber++) {
      getResultPerHole(holeNumber + 1, newPlayerHandicap);
    } 
  },[getResultPerHole, newPlayerHandicap]);

  useEffect(() => {
    if(newPlayerHandicap){
      iterateOnAllHoles();
    }
  },[newPlayerHandicap, iterateOnAllHoles])
  
  const createData = (forat, handicap, strokesPerHole) => {
    setRows(rows => [ ...rows, { forat, handicap, strokesPerHole }])
    return;
  }

  const handleHoleHandicap = (holeResult) => {
    const initalState = { ...editRow, handicap: holeResult.result } 
    setEditRow(initalState)
  };

  const handleHolePersonalHandicap = (holeResult) => {
    const initalState = { ...editRow, strokesPerHole: holeResult.result } 
    setEditRow(initalState) 
  };

  const updatePlayer =  useCallback(() => {
    if(newPlayerHandicap && editRow){
      const updatedPlayerHandicap =  newPlayerHandicap.slice();
      const newPersonalHandicap = [];
      const newHoleHandicap = [];
      updatedPlayerHandicap[0].holeHandicap.map((holeHandicap) => {
        if(holeHandicap.holeNumber === editRow.forat){
          newHoleHandicap.push({ holeNumber: editRow.forat, result: editRow.handicap });
        }else{
          newHoleHandicap.push(holeHandicap)
        }
        return undefined;
      })
      updatedPlayerHandicap[0].result.map((hole) => {
        if(hole.holeNumber === editRow.forat){
          newPersonalHandicap.push({ holeNumber: editRow.forat, result: editRow.strokesPerHole });
        }else{
          newPersonalHandicap.push(hole);
        }
        return undefined;
      });
      updatedPlayerHandicap[0].holeHandicap = newHoleHandicap;
      updatedPlayerHandicap[0].result = newPersonalHandicap;
      setNewPlayerHandicap(updatedPlayerHandicap);
      const sendUpdatedPlayer = async () => {
        if (newPlayerHandicap && newPlayerHandicap.length){
          try {
            await updatePlayerHandicap(newPlayerHandicap);
          }
          catch (error){
            errorCode.message = error.message ? error.message: errorCode.message;
            setOpenAlert(true)
            setErrorCode(errorCode);
          }
        }
      }
      sendUpdatedPlayer();
    }else{
      return undefined;
    }
  },[editRow, newPlayerHandicap, errorCode]);

  const handleCloseAlert = () => {
    setErrorCode();
    setOpenAlert(false);
  };

  return (
    <Container>
      <TableContainer component={ Paper }>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Nº</StyledTableCell>
              <StyledTableCell align="left">Hdp</StyledTableCell>
              <StyledTableCell align="left">Golpes</StyledTableCell>
              <StyledTableCell align="left">Editar</StyledTableCell>
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
                <StyledTableCell align="left">{row.strokesPerHole}</StyledTableCell>
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
          {`Hoyo nº: ${editRow.forat}`} <br/>
          <Hole
            key={ editRow.forat } 
            holeNumber={ editRow.forat } 
            handleHoleResult={ handleHoleHandicap } 
            selectedCourse={ selectedCourse } 
            label={ 'Handicap' }
            value={ editRow.handicap }
          />
          <Hole 
            key={ editRow.forat + 1 } 
            holeNumber={ editRow.forat } 
            handleHoleResult={ handleHolePersonalHandicap } 
            selectedCourse={ selectedCourse } 
            label={ 'Golpes' }
            value={ editRow.strokesPerHole }
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
