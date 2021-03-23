import { db } from './admin';

export const fetchUserProfile = async (currentUserId) => {
  try {
    const playerDoc = await db.collection('users').doc(currentUserId).get();
    let playerData = '';
    if (playerDoc.exists){
      playerData = playerDoc.data();
    };
    return playerData;
  } catch (error) {
    console.log('Error fetching User profile');
    console.log(error);
  }
};
