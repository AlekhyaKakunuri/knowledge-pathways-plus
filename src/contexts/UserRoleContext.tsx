import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface UserRoleContextType {
  userRole: 'user';
  isAdmin: false;
  isLoading: boolean;
}

const UserRoleContext = createContext<UserRoleContextType>({
  userRole: 'user',
  isAdmin: false,
  isLoading: false,
});

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};

interface UserRoleProviderProps {
  children: ReactNode;
}

export const UserRoleProvider: React.FC<UserRoleProviderProps> = ({ children }) => {
  const { currentUser } = useAuth();

  const value: UserRoleContextType = {
    userRole: 'user',
    isAdmin: false,
    isLoading: !currentUser,
  };

  return (
    <UserRoleContext.Provider value={value}>
      {children}
    </UserRoleContext.Provider>
  );
};
