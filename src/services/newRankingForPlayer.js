import { db, FieldValue } from './admin';

export const newRankingForPlayer = async (ranking, userProfile) => {
  if(userProfile.rankingsIds){
    const newRankingId = {id: ranking.id, status: 'active'};
    try {
      const playerRef = await db.collection('users').doc(userProfile.uid).update({
        rankingsIds: FieldValue.arrayUnion(newRankingId)
      });
      return playerRef;
    } catch (error) {
      console.log('Error updating new Ranking in user doc');
      console.log(error);
    }
  }else{
    const rankingsIds = [{id: ranking.id, status: 'active'}];
    try {
      const playerRef = await db.collection('users').doc(userProfile.uid).update({rankingsIds});
      return playerRef;
    } catch (error) {
      console.log('Error creating new Ranking in user doc');
      console.log(error);
    }
    return rankingsIds;
  };
};