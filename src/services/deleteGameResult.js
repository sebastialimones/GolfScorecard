import { db } from './admin';

export const deleteGameResult = async (result) => {
  await db.collection('games').doc(result.id)
    .update({ status: 'deleted' });
  return undefined;
};