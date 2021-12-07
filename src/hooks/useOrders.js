import { apiService } from '@/services';
import { OrderState } from '@/store/types';
import * as React from 'react';

type hookReturnType = (
  success?: (data: OrderState) => void,
  error?: (data: {message: string}) => void
) => {
  fetchOrders: () => void;
  isLoading: boolean;
};

export const useOrders: hookReturnType = (success, error) => {
  const [isLoading, setIsLoading] = React.useState(false);
  
  const fetchOrders = async () => {
    setIsLoading(true)
    try {
      const res = await apiService.get('/orders');
      setIsLoading(false);
      success && success(res.data.data.orders);
    } catch (e: any) {
      console.log(e);
      setIsLoading(false);
      error && error(e.response.data);
    }
  }

  return { fetchOrders, isLoading};
}
