import { db, Timestamp } from './admin';

export const updateGameInRankings = async (userId, rating, rankingGameIds, gameId) => {
  try{
    const updatedGame = {
      id: gameId,
      timeStamp: Timestamp.now(),
      userId: userId,
      rating: rating,
      status: 'active',
    }
    rankingGameIds.map((ranking) => {
      const rankingGames = async () => {
        const gameRef = await db.collection('rankings').doc(ranking.id).get();
        const gameData = gameRef.data();
        gameData.games.find((game, index) => {
          if(game.id === gameId){
            gameData.games[index] = updatedGame;
            return true;
          };
          return true;
        });
        await db.collection('rankings').doc(ranking.id).set(gameData);
      };
      rankingGames();
      return undefined;
      })
    } catch(error) {
    console.log('Error updating a game in a ranking');
    console.log(error);
    return error
  };
};