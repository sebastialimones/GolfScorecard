import { db, Timestamp } from './admin';

export const updatePlayerHandicap = async (newPlayerHandicap) => {
  try {
    const playerRef = db.collection('players').doc(newPlayerHandicap[0].id).update({
      email: newPlayerHandicap[0].email,
      course: newPlayerHandicap[0].course,
      holeHandicap: newPlayerHandicap[0].holeHandicap,
      id: newPlayerHandicap[0].id,
      result: newPlayerHandicap[0].result,
      timestamp: Timestamp.now(),
      uid: newPlayerHandicap[0].uid,
      rankingsIds: newPlayerHandicap[0].rankingsIds ? newPlayerHandicap[0].rankingsIds : 'no rank'
    })
    return playerRef;
  } catch (error) {
    console.log('Error updating course');
    console.log(error);
  }
};
