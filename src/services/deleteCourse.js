import { db } from './admin';

export const deleteCourse = async (courseId) => {
  await db.collection('players').doc(courseId)
    .update({ status: 'deleted' });
  return undefined;
};
