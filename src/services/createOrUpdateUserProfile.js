import { db, Timestamp } from './admin';

export const createOrUpdateUserProfile = async ({ name, birthDate, dbUserProfile }) => {
  try {
    const newProfile = {
      updatedTimestamp: Timestamp.now(),
      name: name,
      birthDate: birthDate,
      email: dbUserProfile.email,
      createdTimestamp: dbUserProfile.timestamp,
      uid: dbUserProfile.uid
    };
    await db.collection('users').doc(dbUserProfile.uid).set(newProfile);
    return;
  } catch (error) {
    console.log('Error creating or updating user profile');
    console.log(error);
  }
};