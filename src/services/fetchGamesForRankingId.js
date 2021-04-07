import { db } from './admin';

export const fetchGamesForRankingId = async (rankingId) => {
  const games = [];
  try {
    const gamesRef = await db.collection('games')
    .get()
    gamesRef.forEach((snapshot) => {
      const game = snapshot.data();
      if(game.rankingGames){
        game.rankingGames.map((gameobj)=> {
          if(game.status === 'active' && gameobj.id === rankingId){
            games.push(game)
          }; 
          return games;
        });
      }
    });
    return games;
  } catch (error) {
    console.log('Error fetching games for ranking');
    console.log(error);
  };
};
