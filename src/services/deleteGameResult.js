import { db } from './admin';
import { deleteGameInRankings } from '../services';

export const deleteGameResult = async (result) => {
  await db.collection('games').doc(result.id)
    .update({ status: 'deleted' });
  deleteGameInRankings(result);
  return undefined;
};