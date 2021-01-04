import { db } from './admin';

export const fetchCoursesPerUser = async (currentUserId) => {
  try {
    const playerRef = db.collection('players');
    const courses = [];
    const snapshots = await playerRef.get();
    snapshots.forEach((snapshot) => {
      const course = snapshot.data();
      if (course.uid === currentUserId) {
        const obj = { value: course.course, label: course.course }
        courses.push((obj));
      };
    });
    return courses;
  } catch (error) {
    console.log('Error fetching player');
    console.log(error);
  };
};
