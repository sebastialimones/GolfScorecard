import { v4 as uuidv4 } from 'uuid';
import { db, Timestamp } from './admin';

export const createGameResult = async ({ user, playerHandicap, result, selectedCourse }) => {
  try {
    const newGameResult = {
      email: user.email,
      result,
      timestamp: Timestamp.now(),
      id: uuidv4(),
      course: selectedCourse,
      playerHandicap: playerHandicap[0].result,
      uid: playerHandicap[0].uid
    };
    await db.collection('games').doc(newGameResult.id).set(newGameResult);
    return "success";
  } catch (error) {
    console.log('Error creating a game result');
    console.log(error);
  }
}