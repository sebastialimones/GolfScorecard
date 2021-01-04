import { v4 as uuidv4 } from 'uuid';
import { db, Timestamp } from './admin';
import { addYearToCoursePlayed } from './index';

export const createGameResult = async ({ user, playerHandicap, result, selectedCourse }) => {
  const currentDate = Timestamp.now().toDate();
  const currentYear = currentDate.getFullYear();
  try {
    const newGameResult = {
      email: user.email,
      result,
      timestamp: Timestamp.now(),
      id: uuidv4(),
      course: selectedCourse,
      playerHandicap: playerHandicap[0].result,
      uid: playerHandicap[0].uid,
      status: 'active'
    };
    const newGameCreated = await db.collection('games').doc(newGameResult.id).set(newGameResult);
    if(playerHandicap[0].years && playerHandicap[0].years.includes(currentYear)){
      return newGameCreated;
    };
    addYearToCoursePlayed(playerHandicap, currentYear);
  } catch (error) {
    console.log('Error creating a game result');
    console.log(error);
  }
}