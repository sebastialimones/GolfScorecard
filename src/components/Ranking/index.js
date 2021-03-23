import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCurrentUser } from '../../hooks/userCurrentUser';
import { fetchUserProfile, fetchRankingsPerUser } from '../../services';
import { NoRankingCode } from '../NoRankingCode';
import { RankingClasification } from '../RankingClasification';

const Container = styled.div`
  margin: 1em;
`;

const Loading = styled.div``;

export const Ranking = ({ history }) => {
  const [user, isFetchingUser] = useCurrentUser();
  const [userProfile, setUserProfile] = useState('');
  const [veryfyingRankings, setVeryfyingRankings] = useState(true);
  const [rankingDetails, setRankingDetails] = useState('');
  const [newVerifyedRanking, setNewVerifyedRanking] = useState(false)
  const currentUserId = user && user.id;

  useEffect(() => {
    !currentUserId && !isFetchingUser && history.push('/landing');
  }, [isFetchingUser, history, currentUserId, user]);

  useEffect(() => {
    const getUserProfile = async () => {
      const userProfile = await fetchUserProfile(currentUserId);
      setUserProfile(userProfile)
    };
    user && getUserProfile();
  },[user, currentUserId, newVerifyedRanking]);

  useEffect(() => {
    const getRankings = async () => {
      if(userProfile.rankingsIds.length){
        const rankings = await fetchRankingsPerUser(userProfile.rankingsIds);
        setRankingDetails(rankings);
        setVeryfyingRankings(false);
      } else{
        setVeryfyingRankings(false);
      }
    };
    setNewVerifyedRanking(false);
    currentUserId && userProfile && getRankings();
  }, [user, currentUserId, userProfile]);

  const deleteRankingDetails = () => {
    setRankingDetails('');
  };

  const newCheckedRanking = () => {
    setNewVerifyedRanking(true);
  };

  return(
    <Container>
      { veryfyingRankings 
      ?
      <Loading>
        Cargando...
      </Loading>
      :
        rankingDetails 
        ? 
        <RankingClasification
          userProfile={ userProfile }
          rankingDetails={ rankingDetails }
          deleteRankingDetails= { deleteRankingDetails }
        />
        : 
        <NoRankingCode 
        userProfile={ userProfile }
        newCheckedRanking= { newCheckedRanking }
        />
      }
    </Container>
    
  )
};

