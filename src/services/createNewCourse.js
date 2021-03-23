import { v4 as uuidv4 } from 'uuid';
import { db, Timestamp } from './admin';

export const createNewCourse = async ({ name, coursePuntuation}) => {
  try{
    const newCourse = {
      name: name,
      holes: coursePuntuation,
      timestamp: Timestamp.now(),
      id: uuidv4(),
      status: 'active'
    };
    const newCourseCreated = await db.collection('courses').doc(newCourse.id).set(newCourse);
    return newCourseCreated;
  } catch(error) {
    console.log('Error creating a new course');
    console.log(error);
    return error
  };
};
