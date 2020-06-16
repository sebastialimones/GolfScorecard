import { v4 as uuidv4 } from 'uuid';
import { db, Timestamp } from './admin';

export const createGameResult = async ({ player, result }) => {
  try {
    const newGameResult = {
      player,
      result,
      timestamp: Timestamp.now(),
      id: uuidv4(),
      course: "Son Servera Golf",
    };
    await db.collection('games').doc(newGameResult.id).set(newGameResult);
  } catch (error) {
    console.log('Error creating a game result');
    console.log(error);
  }
}