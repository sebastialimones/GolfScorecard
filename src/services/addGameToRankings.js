import { db, Timestamp, FieldValue } from './admin';

export const addGameToRankings = async (userId, rating, rankingGameIds, gameId) => {
  try{
    const newGameCreated = {
      id: gameId,
      timeStamp: Timestamp.now(),
      userId: userId,
      rating: rating,
      status: 'active',
    }
    rankingGameIds.map((ranking) => {
      const rankingGames = async ()=> {
        await db.collection('rankings').doc(ranking.id).update({
          games: FieldValue.arrayUnion(newGameCreated)
        });
      };
      rankingGames();
      return rankingGames;
    })
  } catch(error) {
    console.log('Error adding a game to a ranking');
    console.log(error);
    return error
  };
};
