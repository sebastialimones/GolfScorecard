import { db } from './admin';

export const fetchRankingsPerUser = async (rankingsIds) => {
  try {
    const rankingRef = db.collection('rankings');
    const rankings = [];
    const snapshots = await rankingRef.get();
    snapshots.forEach((snapshot) => {
      const ranking = snapshot.data();
      rankingsIds.map((userRanking) => {
        if(userRanking.status === 'active' && userRanking.id === ranking.id){
          rankings.push((ranking));
        };
        return rankings;
      });
    });
    return rankings;
  } catch (error) {
    console.log('Error fetching rankings per user');
    console.log(error);
  };
};


//3 states for a ranking
// active - It is shown and also you add a new game to this ranking
// deactivated - It is shown but you don't add new games to this ranking
// deleted - You neither show nor add any game to this ranking