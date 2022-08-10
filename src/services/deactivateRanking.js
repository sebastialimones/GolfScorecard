import { db } from './admin';
import { deactivaRankingPerUser } from './deactivateRankingPerUser';
import { deactivateRankingPerCourse } from './deactivateRankingPerCourse';

export const deactivateRanking = async (ranking) => {
  await db.collection('rankings').doc(ranking)
    .update({ status: 'deactivated' });
    deactivaRankingPerUser(ranking);
    deactivateRankingPerCourse(ranking);
  return undefined;
};
