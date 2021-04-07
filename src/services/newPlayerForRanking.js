import { db } from './admin';

export const newPlayerForRanking = async (ranking, userProfile) => {
  const updatedPlayers = [userProfile.uid];
  ranking.players.map((playerId) => {
    updatedPlayers.push(playerId)
    return updatedPlayers;
  });
  const newPlayersWithoutDuplicates = [...new Set(updatedPlayers)]
  try {
    const newRanking = {
      name: ranking.name,
      code: ranking.code,
      timestamp: ranking.timestamp,
      id: ranking.id,
      players: newPlayersWithoutDuplicates,
      multiplier:ranking.multiplier,
      status: ranking.status,
    };
    await db.collection('rankings').doc(ranking.id).update(newRanking);
    return;
  } catch (error) {
    console.log('Error updating players in ranking');
    console.log(error);
  }
};
