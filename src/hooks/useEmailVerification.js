import { apiService } from '@/services';
import * as React from 'react';

type verifyEmailType = {
  email: string;
  code: string;
}

type resendTokenType = {
  email: string;
}

type hookReturnType = (callback?: () => void) => [
  (args: verifyEmailType) => void,
  (args: resendTokenType) => void,
  boolean,
  any,
  any,
]

export const useEmailVerification: hookReturnType = (callback) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  
  const verifyEmail = async (args: verifyEmailType) => {
    setIsLoading(true)
    try {
      const res = await apiService.post('/auth/verify', args);
      setData(res.data.data);
      setIsLoading(false);
      callback && callback();
    } catch (e: any) {
      console.log(e);
      setError(e.response.data);
      setIsLoading(false)
      callback && callback();
    }
  }
  
  const resendToken = async (args: resendTokenType) => {
    setIsLoading(true)
    try {
      const res = await apiService.post('/auth/resend-token', args);
      setData(res.data);
      setIsLoading(false);
      callback && callback();
    } catch (e: any) {
      console.log(e.response.data);
      setError(e.response.data);
      setIsLoading(false)
      callback && callback();
    }
  }


  return [verifyEmail, resendToken, isLoading, data, error];
}


