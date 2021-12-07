import { apiService } from '@/services';
import { UserState } from '@/store/types';
import * as React from 'react';

type hookReturnType = (
  success?: (data: UserState) => void,
  error?: (data: {message: string}) => void
) => {
    updateUser: (args: UserState) => void;
    getUser: () => void,
    isLoading: boolean;
};

export const useUser: hookReturnType = (success, error) => {
  const [isLoading, setIsLoading] = React.useState(false);
  
  const updateUser = async (args: UserState) => {
    setIsLoading(true)
    try {
      const res = await apiService.patch('/users/me/update', args);
      setIsLoading(false);
      success && success(res.data.data);
    } catch (e: any) {
      console.log(e);
      setIsLoading(false);
      error && error(e.response.data);
    }
  }

  const getUser = async () => {
    setIsLoading(true)
    try {
      const res = await apiService.get('/users/me');
      setIsLoading(false);
      success && success(res.data.data);
    } catch (e: any) {
      console.log(e);
      setIsLoading(false);
      error && error(e.response.data);
    }
  }

  return { updateUser, getUser, isLoading};
}
