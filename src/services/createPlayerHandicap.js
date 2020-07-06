import { v4 as uuidv4 } from 'uuid';
import { db, Timestamp } from './admin';

export const createPlayerHandicap = async ({ email, uid, course, personalHandicap, coursePar }) => {
  try {
    const newHandicapResult = {
      email: email,
      uid: uid,
      result: personalHandicap,
      holeHandicap: coursePar,
      timestamp: Timestamp.now(),
      id: uuidv4(),
      course: course,
    };
    await db.collection('players').doc(newHandicapResult.id).set(newHandicapResult);
    return;
  } catch (error) {
    console.log('Error creating a handicap');
    console.log(error);
  }
}