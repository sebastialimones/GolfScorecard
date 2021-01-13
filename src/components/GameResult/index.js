import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { GamesEditor } from '../GamesEditor';
import { deleteGameResult } from '../../services/deleteGameResult';
import { Notification } from '../Notification';

const ResultContainer = styled.div`
  margin-bottom: 1em;
  margin-top: 1em;
`;
const Date = styled.div`
  font-weight: bold; 
  margin: 2px;
`;

const DataItem = styled.div`
  padding: 1px;
`;

const Rating = styled.div`
  padding: 1px;
  font-weight: bold;
  color: gray;
`;

const RedDataItem = styled.div`
  padding: 1px;
  color: red;
`;

const GreenDataItem = styled.div`
  padding: 1px;
  color: green;
`;


export const GameResult = ({ result, refreshResults }) => {
  const [openEditing, setOpenEditing] = useState(false);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [errorCode, setErrorCode] = useState();

  const handleClick = () => {
    setOpenEditing(!openEditing);
    setShowDeleteIcon(!showDeleteIcon)
  };

  const deleteClick = async () => {
    try {
      await deleteGameResult(result);
      setOpenAlert(true);
    }
    catch (error){
      errorCode.message = error.message ? error.message: errorCode.message;
      setOpenAlert(true)
      setErrorCode(errorCode);
    }
  };

  const deleteConfirmation = () => {
    const confirmation = window.confirm('¿Estás seguro que quieres borrar esta partida?');
    if(confirmation === true){
      deleteClick();
    };
  };

  const handleCloseAlert = () => {
    setErrorCode();
    setOpenAlert(false);
    refreshResults();
  };

  return(
    <ResultContainer>
      <Date>
      {
        moment(result.timestamp).format("D MMM YYYY")
      }
      <IconButton
        aria-label="more"
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={ handleClick }
        >
        <EditIcon/>
      </IconButton>
      { showDeleteIcon &&
      <IconButton
        aria-label="more"
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={ deleteConfirmation }
        color='secondary'
        >
        <DeleteIcon/>
      </IconButton>
      }
      </Date>
      {
      !openEditing ?
      <React.Fragment>
        <DataItem>
        {
          `Hoyos:  ${result.numberOfHoles} `
        }
        </DataItem>
        <DataItem>
        {
          `Puntos totales:  ${result.totalPoints} `
        }
        </DataItem>
        <DataItem>
        {
          `Golpes totales:  ${result.totalStrokes} - (${result.totalMosques} 🦟)`
        }
        </DataItem>
        <DataItem>
        {
          `Handicap:  ${result.totalPointsPerHandicap} golpes`
        }
        </DataItem>
        { ((result.numberOfHoles * 2) - result.totalPoints) !== 0
            ? ((result.numberOfHoles * 2) - result.totalPoints) > 0
            ? <RedDataItem>
            {
              `Resultado: +${result.numberOfHoles * 2 - result.totalPoints} `
            }
            </RedDataItem>
            : <GreenDataItem>
            {
              `Resultado: ${result.numberOfHoles * 2 - result.totalPoints} `
            }
            </GreenDataItem>
          :
          <DataItem>
          {
            `Resultado: ${result.numberOfHoles * 2 - result.totalPoints} `
          }
          </DataItem>
        }
        <Rating>
        {
          `Game rating:  ${(result.totalPoints / result.numberOfHoles).toFixed(2)} `
        }
        </Rating>
      </React.Fragment>
      : 
      <GamesEditor result={ result } refreshResults={ refreshResults }/>
    }
    <Notification
      onClose={ handleCloseAlert }
      message={ errorCode ? errorCode.message : "Partida borrada" }
      open={ openAlert }
      severity={ errorCode ? errorCode.severity : "success" }
    />
    </ResultContainer>
  )
}