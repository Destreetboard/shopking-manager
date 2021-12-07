import { apiService } from '@/services';
import { OrderItem } from '@/store/types';
import * as React from 'react';

type hookReturnType = (
  success?: (data: OrderItem) => void,
  error?: (data: {message: string}) => void
) => {
  getOrderDetails: (id: string) => void;
  isGettingDetails: boolean;
};

export const useOrderDetails: hookReturnType = (success, error) => {
  const [isLoading, setIsLoading] = React.useState(false);
  
  const getOrderDetails = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await apiService.get(`/orders/${id}`);
      setIsLoading(false);
      success && success(res.data.data);
    } catch (e: any) {
      console.log(e);
      setIsLoading(false);
      error && error(e.response.data);
    }
  }

  return {getOrderDetails, isGettingDetails: isLoading};
}
