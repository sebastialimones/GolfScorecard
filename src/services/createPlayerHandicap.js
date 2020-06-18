import { v4 as uuidv4 } from 'uuid';
import { db, Timestamp } from './admin';

export const createPlayerHandicap = async ({ player, result, holeHandicap }) => {
  try {
    const newHandicapResult = {
      player,
      result,
      holeHandicap,
      timestamp: Timestamp.now(),
      id: uuidv4(),
      course: "Son Servera Golf",
    };
    await db.collection('players').doc(newHandicapResult.id).set(newHandicapResult);
    return;
  } catch (error) {
    console.log('Error creating a handicap');
    console.log(error);
  }
}