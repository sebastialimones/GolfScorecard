import { db, Timestamp } from './admin';

export const deleteGameInRankings = async (result) => {
  try{
    result.rankingGames.map((ranking) => {
      const rankingGames = async () => {
        const gameRef = await db.collection('rankings').doc(ranking.id).get();
        const gameData = gameRef.data();
        gameData.games.find((game, index) => {
          if(game.id === result.id){
            gameData.games[index].status = "deleted"
            gameData.games[index].timeStamp = Timestamp.now()
            return true;
          };
          return 'deleted';
        });
        await db.collection('rankings').doc(ranking.id).set(gameData);
      };
      rankingGames();
      return undefined;
      })
    } catch(error) {
    console.log('Error deleting a game in the rankings');
    console.log(error);
    return error
  };
};