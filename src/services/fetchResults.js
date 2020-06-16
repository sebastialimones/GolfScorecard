import { db } from './admin';
import { convertGame } from './convertes';

export const fetchResults = async (player) => {
    try {
    const gamesRef = db.collection('games');
    const games = [];
    const snapshots = await gamesRef.get();
    snapshots.forEach((snapshot) => {
      const game = snapshot.data();
      if (game.player !== player) {
        games.push(convertGame(game));
      } 
    });
    return games;
  } catch (error) {
    console.log('Error fetching games');
    console.log(error);
  }
}