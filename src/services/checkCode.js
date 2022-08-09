import { db } from './admin';
import { newPlayerForRanking, newRankingForPlayer } from './index';

export const checkCode = async (code, userProfile) => {
  try {
    const rankingRef = db.collection('rankings');
    const rankings = [];
    const snapshots = await rankingRef.get();
    snapshots.forEach((snapshot) => {
      const ranking = snapshot.data();
      if(ranking.code === code && ranking.status === 'active'){
        ranking.players.includes(userProfile.uid);
        rankings.push((ranking));
        newPlayerForRanking(ranking, userProfile);
        newRankingForPlayer(ranking, userProfile);
      };
    });
    return rankings;
  } catch (error) {
    console.log('Error checking code');
    console.log(error);
  };
};
