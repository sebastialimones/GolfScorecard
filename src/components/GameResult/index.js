import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { GamesEditor } from '../GamesEditor';

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

  const handleClick = () => {
    setOpenEditing(!openEditing)
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
      </React.Fragment>
      : 
      <GamesEditor result={ result } refreshResults={ refreshResults }/>
    }
    </ResultContainer>
  )
}