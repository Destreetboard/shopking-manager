import { apiService } from '@/services';
import * as React from 'react';

type resetPassordType = {
  email: string;
  code: string;
  password: string;
}

type requestPasswordResetType = {
  email: string;
}

type hookReturnType = (callback?: () => void) => [
  (args: requestPasswordResetType) => void,
  (args: resetPassordType) => void,
  boolean,
  boolean,
  any,
]

export const useResetPassword: hookReturnType = (callback) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(null);
  
  const resetPassword = async (args: resetPassordType) => {
    setIsLoading(true)
    try {
      const res = await apiService.post('/auth/password-reset', args);
      setSuccess(true);
      setIsLoading(false);
      callback && callback();
    } catch (e: any) {
      console.log(e);
      setError(e.response.data);
      setIsLoading(false)
      callback && callback();
    }
  }
  
  const requestPasswordReset = async (args: requestPasswordResetType) => {
    setIsLoading(true)
    try {
      const res = await apiService.post('/auth/request-password-reset', args);
      setSuccess(true);
      setIsLoading(false);
      callback && callback();
    } catch (e: any) {
      console.log(e);
      setError(e.response.data);
      setIsLoading(false)
      callback && callback();
    }
  }
  


  return [requestPasswordReset, resetPassword, isLoading, success, error];
}
