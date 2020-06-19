import { db } from './admin';

export const fetchPlayer = async (playerName) => {
    try {
      const playerRef = db.collection('players');
      const players = [];
      const snapshots = await playerRef.get();
      snapshots.forEach((snapshot) => {
        const player = snapshot.data();
        if (player.name === playerName) {
          players.push((player));
        } 
      });
      return players;
  } catch (error) {
    console.log('Error fetching player');
    console.log(error);
  }
}