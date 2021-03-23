import { v4 as uuidv4 } from 'uuid';
import { db, Timestamp } from './admin';

export const createRanking = async ({ name, codeToString }) => {
  try {
    const newRanking = {
      name: name,
      code: codeToString,
      timestamp: Timestamp.now(),
      id: uuidv4(),
      players:[],
      games: [],
      multiplier:{
          specialDates:{}
      },
      status:'active',
      duration: 'no end'
    };
    await db.collection('rankings').doc(newRanking.id).set(newRanking);
    return;
  } catch (error) {
    console.log('Error creating a ranking');
    console.log(error);
  }
};