import { useEffect, useState } from 'react';
import { auth } from '../services';

export const useCurrentUser = () => {
  const [user, setUser] = useState(undefined);
  const [isFetchingUser, setFetchingUser] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser && { id: firebaseUser.uid, email: firebaseUser.email });
      setFetchingUser(false);
    });
    return unsubscribe;
  }, [setUser, setFetchingUser]);

  return [user, isFetchingUser];
};
