import { Navigate, Outlet } from 'react-router-dom';

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const isUserSignedIn = false;

  if (!isUserSignedIn && isPrivate) {
    return <Navigate to='/sign-in' />;
  }

  if (isUserSignedIn && !isPrivate) {
    return <Navigate to='/' />;
  } 

  return <Outlet />;
}