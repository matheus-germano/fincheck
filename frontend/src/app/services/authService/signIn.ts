import { httpClient } from '../httpClient';

export interface SignInParams {
  email: string;
  password: string;
}

interface SignInResponse {
  accessToken: string
}

export async function signIn(body: SignInParams) {
  const { data } = await httpClient.post<SignInResponse>('/auth/sign-in', body);

  return data;
}