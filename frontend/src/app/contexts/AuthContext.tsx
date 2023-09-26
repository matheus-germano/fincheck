import { ReactNode, createContext, useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { LaunchScreen } from '../../view/components/LaunchScreen';

import { usersService } from '../services/usersService';

import { localStorageKeys } from '../config/localStorageKeys';

interface AuthContextValue {
  signedIn: boolean;
  signIn(accessToken: string): void;
  signOut(): void
}

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessKey = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    return Boolean(storedAccessKey);
  });

  const { isError, isFetching, isSuccess, remove } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
    enabled: signedIn
  });

  const signIn = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    remove();

    setSignedIn(false);
  }, [remove]);

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou');
      signOut();
    }
  }, [isError, signOut]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        signIn,
        signOut
      }}
    >
      <LaunchScreen isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
}