import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchGamesForRankingId } from '../../services';
import { RankingTable } from '../RankingTable';
import { RankingMenu } from '../RankingMenu';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import IconButton from '@material-ui/core/IconButton';

const Container = styled.div`
  margin: 1em;
`;

const PlusButton = styled.div`
  position: fixed;
  bottom: 20px;
`; 

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
`;

const TableContainer = styled.div`

`;

export const RankingClasification = ({ userProfile, rankingDetails, deleteRankingDetails }) => {
  const [rankingName, setRankingName] = useState('');
  const [selectedRanking, setSelectedRanking] = useState('');
  const [gamesRanking, setGamesRanking] = useState('');
  const [selectedRankingDetails, setSelectedRankingDetails] = useState('');

  useEffect(() => {
    const lastSelectedRanking = localStorage.getItem('selectedRanking');
    setSelectedRanking(lastSelectedRanking);
    if(rankingDetails.length > rankingName.length){
      const rankingsName = () => {
        const rankingsName = [];
        rankingDetails && rankingDetails.map((ranking) => {
          const obj = { value: ranking.name, label: ranking.name, id: ranking.id }
          rankingsName.push((obj));
          setRankingName(rankingsName => [...rankingsName, ranking.name]);
          return undefined;
        });
      };
      rankingDetails && rankingsName();
    }
  }, [userProfile, rankingDetails, rankingName.length]);

  useEffect(() => {
    const getRankingGames = async () => {
      rankingDetails.map(async (ranking)  => {
        if(ranking.name === selectedRanking){
          const userRankings = await fetchGamesForRankingId(ranking.id);
          setGamesRanking(userRankings);
          setSelectedRankingDetails(ranking)
        };
      })
    };
     userProfile.rankingsIds && getRankingGames();
  },[userProfile, rankingName, selectedRanking, rankingDetails]);

  const handleRankingChange = (rankingName) => {
    setSelectedRanking(rankingName);
    localStorage.setItem('selectedRanking', rankingName);
  };

  const addNewRanking = () => {
    deleteRankingDetails()
  };

  return(
    <Container>
      <MenuContainer>
        { rankingName && <RankingMenu handleRankingChange={ handleRankingChange } value={ selectedRanking } rankings={ rankingName } /> }
      </MenuContainer>
      <TableContainer>
        { gamesRanking && selectedRanking && <RankingTable gamesRanking={ gamesRanking } selectedRankingDetails={ selectedRankingDetails }/>}
      </TableContainer>
      <PlusButton>
        <IconButton
          aria-label="more"
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={ addNewRanking }
          color='secondary'
          >
          <AddCircleRoundedIcon
            fontSize= { 'large' }
          />
          Add ranking
        </IconButton>
      </PlusButton>
    </Container>
    
  )
};