import { db } from './admin';
import { deactivaRankingPerUser } from './deactivaRankingPerUser';

export const deactivateRanking = async (ranking) => {
  await db.collection('rankings').doc(ranking)
    .update({ status: 'deactivated' });
    deactivaRankingPerUser(ranking)
  return undefined;
};
