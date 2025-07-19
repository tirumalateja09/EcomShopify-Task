import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { setUser, setLoading } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import { User } from '../types';


const SUPER_ADMIN_EMAIL = 'kasanitirumalateja@gmail.com';

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'User',
          email: firebaseUser.email || '',
          avatar: firebaseUser.photoURL || 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
          role: firebaseUser.email === SUPER_ADMIN_EMAIL ? 'admin' : 'user',
        };
        dispatch(setUser(user));
        toast.success(`Welcome back, ${user.name}!`);
      } else {
        dispatch(setUser(null));
      }
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  const signInWithGoogle = async () => {
    try {
      dispatch(setLoading(true));
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      toast.error('Failed to sign in with Google');
      dispatch(setLoading(false));
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out successfully');
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  return { signInWithGoogle, signOutUser };
};

