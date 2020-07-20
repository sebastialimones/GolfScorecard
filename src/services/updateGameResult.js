import { db, Timestamp } from './admin';

export const updateGameResult = async (newGameResult) => {
  try {
    const newGameResultRef = db.collection('games').doc(newGameResult.id).update({
      email: newGameResult.email,
      course: newGameResult.course,
      playerHandicap: newGameResult.playerHandicap,
      id: newGameResult.id,
      result: newGameResult.result,
      timestamp: Timestamp.now(),
      uid: newGameResult.uid,
    })
    return newGameResultRef;
  } catch (error) {
    console.log('Error updating game result');
    console.log(error);
  }
}