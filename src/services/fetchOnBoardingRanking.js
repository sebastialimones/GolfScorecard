import { db } from './admin';

export const fetchOnBoardingRanking = async (currentUserId) => {
    console.log(currentUserId)
    try {
      const playerDoc = await db.collection('users').doc(currentUserId).get();
      if (playerDoc.exists) {
        return playerDoc.data();
      };
  } catch (error) {
    console.log('Error fetching player for ranking on boarding');
    console.log(error);
  }
};