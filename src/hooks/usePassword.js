import { apiService } from '@/services';
import { UserState } from '@/store/types';
import * as React from 'react';

type hookReturnType = (
  success?: (data: {token: string, user: UserState}) => void,
  error?: (data: {message: string}) => void
) => {
    updatePassword: (password: string) => void;
    isLoading: boolean;
};

export const usePassword: hookReturnType = (success, error) => {
  const [isLoading, setIsLoading] = React.useState(false);
  

  const updatePassword = async (password: string) => {
    setIsLoading(true)
    try {
      const res = await apiService.patch('/users/me/password/update', {password});
      setIsLoading(false);
      success && success(res.data.data);
    } catch (e: any) {
      console.log(e);
      setIsLoading(false);
      error && error(e.response.data);
    }
  }

  return { updatePassword, isLoading};
}
