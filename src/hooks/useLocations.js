import { apiService } from '@/services';
import { OrderItem, ItemType } from '@/store/types';
import * as React from 'react';

export type subLocationType = {
  _id: string;
  address: string;
  price: number;
}

export type locationType = {
  _id: string;
  name: string;
  subLocations: subLocationType[];
}

type hookReturnType = (
  success?: (data: locationType[]) => void,
  error?: (data: {message: string}) => void
) => {
  fetchLocations: () => void;
  isLoading: boolean;
};

export const useLocations: hookReturnType = (success, error) => {
  const [isLoading, setIsLoading] = React.useState(false);
  
  const fetchLocations = async () => {
    setIsLoading(true);
    try {
      const res = await apiService.get('/locations');
      setIsLoading(false);
      success && success(res.data.data.locations);
    } catch (e: any) {
      console.log(e);
      setIsLoading(false);
      error && error(e.response.data);
    }
  }

  return {fetchLocations, isLoading};
}
