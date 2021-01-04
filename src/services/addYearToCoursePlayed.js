import { db, FieldValue  } from './admin';

export const addYearToCoursePlayed = async (playerHandicap, currentYear) => {
  try{
    if(!playerHandicap[0].years){
      await db.collection('players').doc(playerHandicap[0].id).update({
        years: [currentYear]
      });
      return;
    };
    await db.collection('players').doc(playerHandicap[0].id).update({
      years: FieldValue.arrayUnion(currentYear)
    });
  return;
  } catch (error) {
    console.log('Error adding a year played to a course');
    console.log(error);
  };
};
