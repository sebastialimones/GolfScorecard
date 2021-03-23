import { db } from './admin';

export const fetchYearsPerCourse = async (playerHandicap) => {
  try{
    const docRef = await db.collection('players').doc(playerHandicap[0].id).get();
    const course = docRef.data();
    const yearsWithLabel = [{ value: 'All', label: 'All' }];
    course.years.forEach((year) => {
      const obj = { value: year, label: year }
      yearsWithLabel.push((obj));
    });
    return yearsWithLabel;
  }catch (error) {
    console.log('Error fetching a year played to a course');
    console.log(error);
  }
};
