import { db } from './admin';

export const deactivateRankingPerCourse = async (deactivatedRankingId) => {
  try {
      const courseSnapshot = await db.collection('players').get();
      courseSnapshot.forEach(async(snapshot) => {
        const course = snapshot.data();
        if(course.rankingsIds && course.rankingsIds.length){
          const updatedRankingIds = [];
          course.rankingsIds.map((rankingId) => {
            if(rankingId.id === deactivatedRankingId){
              updatedRankingIds.push({ id: rankingId.id, status: 'deactivated' });
            } else {
              updatedRankingIds.push(rankingId);
            };
          return undefined;
          });
          try {
            await db.collection('players').doc(course.id).update({
              rankingsIds: updatedRankingIds
            });
          } catch (error) {
            console.log('Error deactivating ranking per course');
            console.log(error);
          }
        }
        return undefined;
      });
    }
    catch (error) {
    console.log('Error deactivating rankings per course played');
    console.log(error);
    }
};