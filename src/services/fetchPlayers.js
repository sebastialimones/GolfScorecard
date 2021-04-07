import { db } from './admin';

export const fetchPlayers = async () => {
    try {
      const playersSnapshots = await db.collection('users').get();
      const players = [];
      playersSnapshots.forEach((playersSnapshot) => {
        players.push(playersSnapshot.data());
      });
      return players;
  } catch (error) {
    console.log('Error fetching players');
    console.log(error);
  }
};
