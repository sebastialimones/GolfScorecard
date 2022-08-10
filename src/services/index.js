import { auth as firebaseAuth } from './admin';

export const auth = firebaseAuth;

export * from './createGameResult';
export * from './fetchResults';
export * from './createPlayerHandicap';
export * from './fetchPlayer';
export * from './createUser';
export * from './fetchCoursesPerUser';
export * from './updatePlayerHandicap';
export * from './updateGameResult';
export * from './fetchResult';
export * from './deleteGameResult';
export * from './addYearToCoursePlayed';
export * from './createOrUpdateUserProfile';
export * from './fetchUserProfile';
export * from './deleteCourse';
export * from './fetchGamesForRankingId';
export * from './fetchRankingsPerUser';
export * from './checkCode';
export * from './createRanking';
export * from './newPlayerForRanking';
export * from './saveCoursePerRankingCode';
export * from './newRankingForPlayer';
export * from './createNewCourse';
export * from './addGameToRankings';
export * from './updateGameInRankings';
export * from './deleteGamesInRanking';
export * from './fetchPlayers';
export * from './deactivateRanking';
export * from './deactivateRankingPerUser';
export * from './deactivateRankingPerCourse';
