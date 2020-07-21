import { db, Timestamp } from './admin';

export const createUser = async (user) => {
  try {
    const newUser = {
      timestamp: Timestamp.now(),
      uid: user.id,
      email: user.email,
      status: 'active',
    };
    const userRef = await db.collection('users').doc(user.id);
    userRef.get().then(doc => {
      if(doc.exists){
        return undefined;
      }else{
        db.collection('users').doc(user.id).set(newUser);
      }
    })
  }catch(error) {
    console.log('Error creating a user');
    console.log(error);
  }
}
