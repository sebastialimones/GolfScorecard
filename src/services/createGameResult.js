import { v4 as uuidv4 } from 'uuid';
import { db, Timestamp } from './admin';
import { addYearToCoursePlayed } from './index';
import { addGameToRankings } from '../services';

export const createGameResult = async ({ user, userProfile, playerHandicap, result, selectedCourse, liveScore, numberOfHoles, multiplier, rankingGameIds }) => {
  const currentDate = Timestamp.now().toDate();
  const currentYear = currentDate.getFullYear();
  const rating = liveScore / numberOfHoles;
  try{
    const newGameResult = {
      email: user.email,
      result,
      rating: rating,
      multiplier: multiplier,
      rankingGames: rankingGameIds ? rankingGameIds : 'no rank',
      timestamp: Timestamp.now(),
      id: uuidv4(),
      course: selectedCourse,
      playerHandicap: playerHandicap[0].result,
      uid: playerHandicap[0].uid,
      name: userProfile.name ? userProfile.name : 'no name',
      status: 'active'
    };
    const newGameCreated = await db.collection('games').doc(newGameResult.id).set(newGameResult);
    if(rankingGameIds){
      addGameToRankings(user.id, rating, rankingGameIds, newGameResult.id);
    };
    if(playerHandicap[0].years && playerHandicap[0].years.includes(currentYear)){
      return newGameCreated;
    };
    addYearToCoursePlayed(playerHandicap, currentYear);
  } catch(error) {
    console.log('Error creating a game result');
    console.log(error);
    return error
  };
};
