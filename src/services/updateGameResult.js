import { db } from './admin';
import { updateGameInRankings } from '../services';

export const updateGameResult = async (newGameResult) => {
  try {
    const newGameResultRef = db.collection('games').doc(newGameResult.id).update({
      result: newGameResult.result,
      rating: newGameResult.rating,
    });
    if(newGameResult.rankingGames){
      updateGameInRankings(newGameResult.uid, newGameResult.rating, newGameResult.rankingGames, newGameResult.id);
    };
    return newGameResultRef;
  } catch (error) {
    console.log('Error updating game result');
    console.log(error);
  }
};
