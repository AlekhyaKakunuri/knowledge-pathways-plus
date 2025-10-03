import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,

} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string, displayName?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName?: string, photoURL?: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  deleteAccount: (password: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  reauthenticate: (password: string) => Promise<void>;
  isEmailVerified: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);

  const signup = async (email: string, password: string, displayName?: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name if provided
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: displayName
        });
      }
      
      // Send email verification
      if (userCredential.user) {
        await sendEmailVerification(userCredential.user);
      }
    } catch (error: any) {
      // Handle Firebase configuration errors
      if (error.code === 'auth/api-key-not-valid') {
        throw new Error('Firebase configuration is not set up properly. Please check your Firebase settings.');
      }
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      // Handle Firebase configuration errors
      if (error.code === 'auth/api-key-not-valid') {
        throw new Error('Firebase configuration is not set up properly. Please check your Firebase settings.');
      }
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in was cancelled. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        throw new Error('Popup was blocked by your browser. Please allow popups and try again.');
      } else if (error.code === 'auth/api-key-not-valid') {
        throw new Error('Firebase configuration is not set up properly. Please check your Firebase settings.');
      }
      throw error;
    }
  };



  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      // Handle Firebase configuration errors
      if (error.code === 'auth/api-key-not-valid') {
        throw new Error('Firebase configuration is not set up properly. Please check your Firebase settings.');
      }
      throw error;
    }
  };

  const updateUserProfile = async (displayName?: string, photoURL?: string) => {
    if (!currentUser) {
      throw new Error('No user is currently signed in');
    }

    try {
      const updates: { displayName?: string; photoURL?: string } = {};
      if (displayName !== undefined) updates.displayName = displayName;
      if (photoURL !== undefined) updates.photoURL = photoURL;

      await updateProfile(currentUser, updates);
    } catch (error: any) {
      throw error;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if (!currentUser || !currentUser.email) {
      throw new Error('No user is currently signed in');
    }

    try {
      // Re-authenticate the user first
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);
      
      // Update the password
      await updatePassword(currentUser, newPassword);
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        throw new Error('Current password is incorrect');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('New password is too weak');
      }
      throw error;
    }
  };

  const deleteAccount = async (password: string) => {
    if (!currentUser || !currentUser.email) {
      throw new Error('No user is currently signed in');
    }

    try {
      // Re-authenticate the user first
      const credential = EmailAuthProvider.credential(currentUser.email, password);
      await reauthenticateWithCredential(currentUser, credential);
      
      // Delete the user account
      await deleteUser(currentUser);
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        throw new Error('Password is incorrect');
      }
      throw error;
    }
  };

  const sendVerificationEmail = async () => {
    if (!currentUser) {
      throw new Error('No user is currently signed in');
    }

    try {
      await sendEmailVerification(currentUser);
    } catch (error: any) {
      throw error;
    }
  };

  const reauthenticate = async (password: string) => {
    if (!currentUser || !currentUser.email) {
      throw new Error('No user is currently signed in');
    }

    try {
      const credential = EmailAuthProvider.credential(currentUser.email, password);
      await reauthenticateWithCredential(currentUser, credential);
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        throw new Error('Password is incorrect');
      }
      throw error;
    }
  };

  const isEmailVerified = (): boolean => {
    return currentUser?.emailVerified || false;
  };

  useEffect(() => {
    // Set a timeout to ensure the app renders even if auth takes time
    const timeout = setTimeout(() => {
      setAuthInitialized(true);
    }, 1000);

    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
        setAuthInitialized(true);
        clearTimeout(timeout);
      });

      return () => {
        clearTimeout(timeout);
        unsubscribe();
      };
    } catch (error) {
      setLoading(false);
      setAuthInitialized(true);
      clearTimeout(timeout);
    }
  }, []);

  const value: AuthContextType = {
    currentUser,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    updateUserProfile,
    changePassword,
    deleteAccount,
    sendVerificationEmail,
    reauthenticate,
    isEmailVerified
  };

  return (
    <AuthContext.Provider value={value}>
      {authInitialized && children}
    </AuthContext.Provider>
  );
};
