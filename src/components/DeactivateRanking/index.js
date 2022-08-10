import React, { useState } from 'react';
import styled from 'styled-components';

import { Button } from '../Elements/button';
import { Notification } from '../Notification';
import { deactivateRanking } from '../../services';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Container = styled.div`
  margin: 1em;
`;
const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const RankingName = styled.div`
`;
const Heading = styled.div``;
const InactivateRankingContainer = styled.div`
  margin-top: 2em;
`;

export const DeactivateRankingComponent = ({rankingName, rankingDetails, onChangeRankingState}) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [errorCode, setErrorCode] = useState();
  const [selectedRanking, setSelectedRanking] = useState('');

  
  const deactivate = async () => {
    if(rankingDetails.length){
      const rankindIdExtractor = () => {
        const rankingId = [];
        rankingDetails.map((ranking) => {
          if(ranking.name === selectedRanking){
            rankingId.push(ranking.id);
            deactivateRankingAction(ranking.id);
          };
        return undefined;
        });
      };
      rankindIdExtractor();
    }
  };

  const deactivateRankingAction = async (rankingId) => {
    try{
      const deactivation = await deactivateRanking(rankingId);
      handleRankingStateChange();
      deactivation !== 'error'
        ? setOpenAlert(true)
        : console.log('error')
    }
    catch(error){
      errorCode.message = error.message ? error.message: errorCode.message;
      setOpenAlert(true)
      setErrorCode(errorCode);
    }
    return;
  }

  const handleRankingStateChange = () => {
    const newRankingName = [];
    rankingName.map((rankingName) =>  {
      if(rankingName !== selectedRanking){
        newRankingName.push(rankingName);
      }
      return undefined;
    })
    onChangeRankingState(newRankingName);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleChange = (event) => {
    setSelectedRanking(event.target.value);
  };

  return(
    <Container>
      <InactivateRankingContainer>
        <Heading>
        Desactivar un ranking
        </Heading>
        <Container>
          {rankingName.length &&
            rankingName.map((rankingItem, index) => (
              <RankingContainer  key={ index }>
                <RankingName >{ rankingItem }</RankingName>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={ selectedRanking }
                  onChange={ handleChange }
                >
                  <FormControlLabel value={ rankingItem } key={ index } control={<Radio />}/>
                </RadioGroup>
              </RankingContainer>
            ))
          }  
        </Container>
        <Button type="submit" primary onClick={ deactivate }>Desactivar</Button>
      </InactivateRankingContainer>
      <Notification
          onClose={ handleCloseAlert }
          message={ errorCode ? errorCode.message : 'Fet!' }
          open={ openAlert }
          severity={ errorCode ? errorCode.severity : "success" }
      />
    </Container>
  )
};
  