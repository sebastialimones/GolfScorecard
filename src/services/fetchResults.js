import { db, Timestamp } from './admin';
import { convertGame } from './convertes';

export const fetchResults = async (playerHandicap, selectedCourse, year) => {
  try{ 
    const startOfYear = Timestamp.fromMillis(Date.parse(`January 1, ${year}`));
    const endOfYear = Timestamp.fromMillis(Date.parse(`December 31, ${year}`));
    let gamesRef = db.collection('games');
    if(year !== 'All'){
      gamesRef = gamesRef
      .where('timestamp', '>', startOfYear)
      .where('timestamp', '<', endOfYear);
    };
    const games = [];
    const snapshot = await gamesRef.get();
    snapshot.forEach((snapshot) => {
      const game = snapshot.data();
      if (game.uid === playerHandicap[0].uid && game.course === selectedCourse && game.status !== 'deleted') {
        games.push(convertGame(game));
      } 
    });
    return games;
  } catch (error) {
    console.log('Error fetching games');
    console.log(error);
  }
};
