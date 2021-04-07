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
