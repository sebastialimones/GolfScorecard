import { db, Timestamp } from './admin';

export const createUser = async (user) => {
  try {
    const newUser = {
      timestamp: Timestamp.now(),
      uid: user.id,
      email: user.email,
    };
    await db.collection('users').doc(user.id).set(newUser);
    return;
  } catch (error) {
    console.log('Error creating a user');
    console.log(error);
  }
}