import { db, FieldValue } from './admin';

export const saveCoursePerRankingCode = async (selectedCourse, ranking, userProfile) => {

  try {
    let updatedCourse;
    let fetchedCourse;
    const courseRef = db.collection('players');
    const snapshots = await courseRef.get();
    snapshots.forEach((snapshot) => {
      const course = snapshot.data();
      if (course.uid === userProfile.uid && course.course === selectedCourse && course.status !== 'deleted'){
        fetchedCourse = course;
      };
    });
    if(fetchedCourse.rankingsIds){
      const newRanking = {
        id:ranking[0].id,
        status:'active'
      };
      await db.collection('players').doc(fetchedCourse.id).update({
        rankingsIds: FieldValue.arrayUnion(newRanking)
      });
      return newRanking;
    }else{
      updatedCourse = {...fetchedCourse, rankingsIds:[
        {
          id:ranking[0].id,
          status:'active'
        }
      ]}
      await db.collection('players').doc(fetchedCourse.id).set(updatedCourse);
      return updatedCourse;
    };
  } catch (error) {
    console.log('Error updating course with new Ranking');
    console.log(error);
  };
};
