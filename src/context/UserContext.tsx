import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserData {
  name: string;
  phone: string;
  address: string;
}

interface UserContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = 'krave-mart-user-data';

// Load user data from localStorage
const loadUserData = (): UserData => {
  if (typeof window === 'undefined') {
    return {
      name: '',
      phone: '',
      address: '',
    };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load user data:', error);
  }

  return {
    name: '',
    phone: '',
    address: '',
  };
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>(loadUserData);

  // Save to localStorage whenever userData changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  }, [userData]);

  const updateUserData = (newData: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
