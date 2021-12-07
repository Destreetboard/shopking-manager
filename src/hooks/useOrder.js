import { apiService } from '@/services';
import { OrderItem, ItemType } from '@/store/types';
import * as React from 'react';

type argsType = {
  items: ItemType[],
  location: {
    locationId: string;
    subLocationId: string;
  },
  status: 'PROCESSED' | 'PENDING' | 'ACTIVE' | 'PAID' | 'COMPLETED';
  orderNo: string;
}

type hookReturnType = (
  success?: (data: OrderItem) => void,
  error?: (data: {message: string}) => void
) => {
  createOrder: (args: argsType) => void;
  updateOrder: (id: string, args: OrderItem) => void;
  isLoading: boolean;
};

export const useOrder: hookReturnType = (success, error) => {
  const [isLoading, setIsLoading] = React.useState(false);
  
  const createOrder = async (args: argsType) => {
    setIsLoading(true)
    try {
      const res = await apiService.patch('/orders', args);
      setIsLoading(false);
      success && success(res.data.data as OrderItem);
    } catch (e: any) {
      console.log(e);
      setIsLoading(false);
      error && error(e.response.data);
    }
  }
  
  const updateOrder = async (id: string, args: OrderItem) => {
    setIsLoading(true)
    try {
      const res = await apiService.post(`/orders/${id}/update`, args);
      setIsLoading(false);
      success && success(res.data.data as OrderItem);
    } catch (e: any) {
      console.log(e);
      setIsLoading(false);
      error && error(e.response.data);
    }
  }

  return {createOrder, updateOrder, isLoading};
}
