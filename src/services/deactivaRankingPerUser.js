import { db } from './admin';

export const deactivaRankingPerUser = async (deactivatedRankingId) => {
  try {
      const playersSnapshots = await db.collection('users').get();
      playersSnapshots.forEach(async(snapshot) => {
        const user = snapshot.data();
        if(user.rankingsIds.length){
          const updatedRankingIds = [];
          user.rankingsIds.map((rankingId) => {
            if(rankingId.id === deactivatedRankingId){
              updatedRankingIds.push({ id: rankingId.id, status: 'deactivated' });
            } else {
              updatedRankingIds.push(rankingId);
            };
          return undefined;
          });
          try {
            await db.collection('users').doc(user.uid).update({
              rankingsIds: updatedRankingIds
            });
          } catch (error) {
            console.log('Error deactivating ranking per user');
            console.log(error);
          }
        }
        return undefined;
      });
    }
    catch (error) {
    console.log('Error fetching players');
    console.log(error);
    }
};
