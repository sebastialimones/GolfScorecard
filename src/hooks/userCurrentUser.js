import { useEffect, useState } from 'react';
import { auth } from '../services';

export const useCurrentUser = () => {
  const [user, setUser] = useState(undefined);
  const [isFetchingUser, setFetchingUser] = useState(true);

  useEffect(() => {
    const userDetails = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser && { id: firebaseUser.uid, email: firebaseUser.email });
      setFetchingUser(false);
    });
    return userDetails;
  }, [setUser, setFetchingUser]);

  return [user, isFetchingUser];
};
