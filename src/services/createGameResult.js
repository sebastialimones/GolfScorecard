import { v4 as uuidv4 } from 'uuid';
import { db, Timestamp } from './admin';

export const createGameResult = async ({ playerHandicap, result }) => {
  try {
    const newGameResult = {
      player: playerHandicap[0].name,
      result,
      timestamp: Timestamp.now(),
      id: uuidv4(),
      course: "Son Servera Golf",
      playerHandicap: playerHandicap[0].result
    };
    await db.collection('games').doc(newGameResult.id).set(newGameResult);
    return "success";
  } catch (error) {
    console.log('Error creating a game result');
    console.log(error);
  }
}