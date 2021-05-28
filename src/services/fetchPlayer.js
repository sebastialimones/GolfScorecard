import { db } from './admin';

export const fetchPlayer = async (currentUserId, course) => {
    try {
      const playerRef = db.collection('players');
      const players = [];
      const snapshots = await playerRef.get();
      snapshots.forEach((snapshot) => {
        const player = snapshot.data();
        if (player.uid === currentUserId && player.course === course && player.status !== 'deleted') {
          players.push((player));
        } 
      });
      return players;
  } catch (error) {
    console.log('Error fetching player');
    console.log(error);
  }
};
