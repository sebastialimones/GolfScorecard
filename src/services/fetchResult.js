import { db } from './admin';

export const fetchResult = async (id) => {
  try {
    const gameDoc = await db.collection('games').doc(id).get();
    if (gameDoc.exists) {
      return gameDoc.data();
    }
  } catch (error) {
    console.log('Error fetching game');
    console.log(error);
  }
};
